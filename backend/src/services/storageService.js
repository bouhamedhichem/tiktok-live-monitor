const fs = require('fs');
const path = require('path');
const config = require('../config');
const logger = require('./logger');

/**
 * A tiny persistence layer backed by JSON files on disk. We avoid a native
 * database dependency (e.g. sqlite bindings) on purpose: this keeps the
 * project trivial to install on any OS for a portfolio/demo context.
 * Writes are debounced so a burst of live comments doesn't hammer the disk.
 */
class JsonStore {
  constructor(filePath, { flushDelayMs = 800 } = {}) {
    this.filePath = filePath;
    this.flushDelayMs = flushDelayMs;
    this.items = this._load();
    this._flushTimer = null;
  }

  _load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw || '[]');
      }
    } catch (err) {
      logger.error(`Failed to load store at ${this.filePath}: ${err.message}`);
    }
    return [];
  }

  _scheduleFlush() {
    if (this._flushTimer) clearTimeout(this._flushTimer);
    this._flushTimer = setTimeout(() => this._flush(), this.flushDelayMs);
  }

  _flush() {
    try {
      fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
      // Write to a temp file then rename, so a crash mid-write can't
      // corrupt the existing data file.
      const tmpPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(this.items, null, 2));
      fs.renameSync(tmpPath, this.filePath);
    } catch (err) {
      logger.error(`Failed to persist store at ${this.filePath}: ${err.message}`);
    }
  }

  add(item) {
    this.items.push(item);
    this._scheduleFlush();
    return item;
  }

  all() {
    return this.items;
  }

  clear() {
    this.items = [];
    this._flush();
  }

  find(predicate) {
    return this.items.find(predicate);
  }
}

const commentsStore = new JsonStore(config.paths.commentsFile);
const leadsStore = new JsonStore(config.paths.leadsFile);

// --- Comments -------------------------------------------------------------

/**
 * De-duplicates on (userId + text + ~2s window) since TikTok's unofficial
 * live signaling channel occasionally redelivers the same event.
 */
function isDuplicateComment({ userId, text, timestamp }) {
  return commentsStore.all().some(
    (c) =>
      c.userId === userId &&
      c.text === text &&
      Math.abs(new Date(c.timestamp) - new Date(timestamp)) < 2000
  );
}

function addComment(comment) {
  if (isDuplicateComment(comment)) return null;
  return commentsStore.add(comment);
}

function getComments() {
  return commentsStore.all();
}

function clearComments() {
  commentsStore.clear();
}

// --- Leads (extracted phone numbers) --------------------------------------

function findLeadByPhone(phoneNumber) {
  return leadsStore.find((l) => l.phoneNumber === phoneNumber);
}

/**
 * Adds a lead if this phone number hasn't been captured yet. If it has,
 * we just bump its "lastSeen"/mentionCount instead of creating a duplicate
 * row — this is the core "prevent duplicate entries" requirement.
 */
function addOrUpdateLead(lead) {
  const existing = findLeadByPhone(lead.phoneNumber);
  if (existing) {
    existing.lastSeen = lead.timestamp;
    existing.mentionCount = (existing.mentionCount || 1) + 1;
    leadsStore._scheduleFlush();
    return { lead: existing, created: false };
  }
  const created = leadsStore.add({ ...lead, firstSeen: lead.timestamp, lastSeen: lead.timestamp, mentionCount: 1 });
  return { lead: created, created: true };
}

function getLeads() {
  return leadsStore.all();
}

function clearLeads() {
  leadsStore.clear();
}

function clearAll() {
  clearComments();
  clearLeads();
}

module.exports = {
  addComment,
  getComments,
  clearComments,
  addOrUpdateLead,
  getLeads,
  clearLeads,
  clearAll,
};
