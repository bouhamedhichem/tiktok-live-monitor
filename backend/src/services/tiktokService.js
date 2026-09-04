const EventEmitter = require('events');
// `tiktok-live-connector` is an unofficial, community-maintained library that
// talks to TikTok's public web LIVE chat feed (the same data your browser
// receives when you open someone's LIVE page). It requires no login and
// only exposes what TikTok already shows publicly on the room page.
// Docs: https://github.com/zerodytrash/TikTok-Live-Connector
//
// IMPORTANT — read this before deploying:
//  - This is a reverse-engineered integration, not an official TikTok API.
//    TikTok can change their protocol at any time, which may break this
//    module until the dependency is updated.
//  - Only connect to rooms you own/operate, or that you have explicit
//    permission to monitor. Respect TikTok's Terms of Service.
//  - Never use anything captured here (usernames, phone numbers, comments)
//    for spam, unsolicited marketing, or any purpose the commenter did not
//    reasonably expect when they typed in a public chat. See README.md
//    ("Legal & Ethical Use") for the full guidance.

// Use a dynamic import so the ESM-only dependency can be loaded from
// CommonJS code without converting the whole repo to ESM.
async function loadTikTokConnector() {
  const mod = await import('tiktok-live-connector');
  return mod.TikTokLiveConnection ?? mod.default?.TikTokLiveConnection ?? mod.default;
}

const config = require('../config');
const logger = require('./logger');
const { analyzeComment } = require('./extractionService');
const storage = require('./storageService');
const { parseTikTokInput } = require('../utils/tiktokInput');

const STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'listening',
  PAUSED: 'paused',
  ERROR: 'error',
  DISCONNECTED: 'disconnected',
};

/**
 * The underlying library sometimes rejects/emits with plain objects that
 * carry a short human-readable `.info` string alongside a huge nested
 * `.exception` payload (raw HTTP request/response internals). We only
 * ever want the short, readable part surfacing in the UI — the full
 * object is still available to whoever's reading server logs, since
 * logger.error is called with it separately wherever this is used.
 */
function formatConnError(err) {
  if (err instanceof Error) return err.message;
  if (err && typeof err === 'object') {
    if (typeof err.info === 'string') return err.info;
    if (typeof err.message === 'string') return err.message;
    return 'Connection error — see server logs for details.';
  }
  return String(err);
}

/**
 * Wraps a single TikTok LIVE connection and re-emits normalized,
 * app-specific events ('status', 'comment', 'lead', 'log') that the
 * WebSocket layer forwards straight to the dashboard.
 */
class TikTokMonitor extends EventEmitter {
  constructor() {
    super();
    this.connection = null;
    this.username = null;
    this.keywords = [...config.defaultKeywords];
    this.status = STATUS.IDLE;
    this.paused = false;
    this.reconnectAttempts = 0;
  }

  _setStatus(status, extra = {}) {
    this.status = status;
    this.emit('status', { status, username: this.username, ...extra });
  }

  setKeywords(keywords) {
    this.keywords = keywords;
  }

  async connect(username) {
    if (this.connection) {
      await this.disconnect();
    }

    this.username = parseTikTokInput(username);
    if (!this.username) {
      const err = new Error('Could not resolve a TikTok username from the input provided.');
      this._setStatus(STATUS.ERROR, { message: err.message });
      throw err;
    }
    this.reconnectAttempts = 0;
    this._setStatus(STATUS.CONNECTING);
    logger.info(`Connecting to TikTok LIVE room for @${this.username}`);

    try {
      // The second argument is required by this library version — passing
      // nothing throws before any network request is even made, which
      // (if not caught here) left the UI stuck on "Connecting..." forever
      // instead of surfacing an error.
      const TikTokLiveConnection = await loadTikTokConnector();
      // handle case where module exports default class directly or as named export
      const ConnClass = TikTokLiveConnection?.prototype ? TikTokLiveConnection : TikTokLiveConnection?.default ?? TikTokLiveConnection;
      this.connection = new ConnClass(this.username, {});
      this._registerHandlers();

      const state = await this._withTimeout(
        this.connection.connect(),
        config.connectTimeoutMs,
        `Timed out after ${config.connectTimeoutMs / 1000}s waiting for TikTok. Either @${this.username} isn't currently live, or the connection is being blocked (firewall, antivirus, or network)[...]
      );
      this.paused = false;
      this._setStatus(STATUS.CONNECTED, { roomId: state?.roomId });
      logger.info(`Connected to room ${state?.roomId} for @${this.username}`);
      return state;
    } catch (err) {
      const message = formatConnError(err);
      this._setStatus(STATUS.ERROR, { message });
      logger.error(`Failed to connect to @${this.username}: ${message}`);
      throw err instanceof Error ? err : new Error(message);
    }
  }

  /**
   * Races a promise against a timeout so a stuck/blocked connection
   * surfaces as a clear error instead of leaving the UI on "Connecting…"
   * indefinitely. Does not cancel the underlying request (the
   * TikTokLiveConnection has no abort hook) — it just stops waiting on it
   * and reports failure; a stray late resolution is harmless since the
   * status has already moved on.
   */
  _withTimeout(promise, ms, message) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(message)), ms);
      promise.then(
        (value) => {
          clearTimeout(timer);
          resolve(value);
        },
        (err) => {
          clearTimeout(timer);
          reject(err);
        }
      );
    });
  }

  _registerHandlers() {
    const conn = this.connection;

    // Chat/comment events. This library's message objects follow TikTok's
    // internal protobuf schema, not a friendly flat shape — verified against
    // node_modules/tiktok-live-proto's WebcastChatMessage/User type defs:
    //   - the handle (what shows as "@name") is `user.displayId`, not
    //     `user.uniqueId` — that field doesn't exist here
    //   - the numeric account id is `user.id`, not `user.userId`
    //   - the comment text is `content`, not `comment`
    // We still fall back through the older/alternate names in case a future
    // library version reshapes this again.
    conn.on('chat', (data) => {
      if (this.paused) return; // still connected, just not recording

      const uniqueId = data.user?.displayId || data.user?.uniqueId || data.uniqueId || 'unknown';
      const nickname = data.user?.nickname || data.nickname || uniqueId;
      const userId = String(data.user?.id || data.user?.userId || data.userId || uniqueId);
      const text = data.content ?? data.comment ?? '';
      const timestamp = new Date().toISOString();

      // Run extraction once, up front, and attach the result to the stored
      // record itself — the frontend then just renders tags instead of
      // re-implementing the same regex logic client-side.
      const analysis = analyzeComment(text, this.keywords);

      const comment = {
        id: `${userId}-${timestamp}-${Math.random().toString(36).slice(2, 8)}`,
        userId,
        uniqueId,
        nickname,
        text,
        timestamp,
        matchedKeywords: analysis.matchedKeywords,
        hasPhoneNumber: analysis.phoneNumbers.length > 0,
        mentions: analysis.mentions,
      };

      const saved = storage.addComment(comment);
      if (!saved) return; // duplicate, dropped silently

      this.emit('comment', saved);

      if (analysis.matchedKeywords.length > 0) {
        this.emit('keyword-match', { comment: saved, keywords: analysis.matchedKeywords });
      }

      analysis.phoneNumbers.forEach((phoneNumber) => {
        const { lead, created } = storage.addOrUpdateLead({
          phoneNumber,
          uniqueId,
          nickname,
          sourceComment: text,
          timestamp,
        });
        this.emit('lead', { lead, created });
      });
    });

    conn.on('connected', (state) => {
      this.reconnectAttempts = 0;
      this._setStatus(STATUS.CONNECTED, { roomId: state?.roomId });
    });

    conn.on('disconnected', () => {
      if (this.status === STATUS.IDLE) return; // we disconnected on purpose
      this._setStatus(STATUS.DISCONNECTED);
      logger.warn(`Disconnected from @${this.username}'s room`);
      this._attemptReconnect();
    });

    conn.on('streamEnd', () => {
      logger.info(`Stream ended for @${this.username}`);
      this._setStatus(STATUS.DISCONNECTED, { reason: 'stream-ended' });
    });

    conn.on('error', (err) => {
      const message = formatConnError(err);
      logger.error(`TikTok connection error: ${message}`);
      this._setStatus(STATUS.ERROR, { message });
    });
  }

  _attemptReconnect() {
    if (!this.username || this.status === STATUS.IDLE) return;
    if (this.reconnectAttempts >= config.reconnect.maxAttempts) {
      logger.warn(`Giving up reconnecting to @${this.username} after ${this.reconnectAttempts} attempts`);
      return;
    }
    this.reconnectAttempts += 1;
    logger.info(
      `Reconnect attempt ${this.reconnectAttempts}/${config.reconnect.maxAttempts} for @${this.username} in ${config.reconnect.delayMs}ms`
    );
    setTimeout(() => {
      this.connect(this.username).catch(() => {
        /* already logged/emitted inside connect() */
      });
    }, config.reconnect.delayMs);
  }

  pause() {
    if (this.status !== STATUS.CONNECTED) return;
    this.paused = true;
    this._setStatus(STATUS.PAUSED);
    logger.info('Monitoring paused by user');
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this._setStatus(STATUS.CONNECTED);
    logger.info('Monitoring resumed by user');
  }

  async disconnect() {
    if (this.connection) {
      try {
        this.connection.disconnect();
      } catch (err) {
        logger.warn(`Error while disconnecting: ${err.message}`);
      }
      this.connection.removeAllListeners();
      this.connection = null;
    }
    this.paused = false;
    this._setStatus(STATUS.IDLE);
  }

  getState() {
    return {
      status: this.status,
      username: this.username,
      paused: this.paused,
      keywords: this.keywords,
    };
  }
}

module.exports = { TikTokMonitor, STATUS };
