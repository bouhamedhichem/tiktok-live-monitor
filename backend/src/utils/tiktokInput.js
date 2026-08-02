/**
 * Normalizes whatever was sent as the "room" to connect to — a pasted
 * TikTok LIVE/profile link, a bare "@username", or a plain username —
 * down to just the username `TikTokLiveConnection` expects.
 *
 * The frontend already does this parsing before it ever emits
 * 'connect-room', so in normal use this just strips a leading "@". It
 * exists here too as a defensive fallback for anyone calling the
 * WebSocket/REST layer directly instead of through the dashboard UI.
 */
function parseTikTokInput(input) {
  if (!input) return '';
  const trimmed = String(input).trim();

  const urlMatch = trimmed.match(/tiktok\.com\/@([a-zA-Z0-9._]+)/i);
  if (urlMatch) return urlMatch[1];

  return trimmed.replace(/^@/, '');
}

module.exports = { parseTikTokInput };
