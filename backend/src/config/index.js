// Centralized configuration. Every other module reads settings from here
// instead of touching process.env directly, so defaults live in one place.
require('dotenv').config();

function parseList(value, fallback) {
  if (!value) return fallback;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Some hosting platforms expose a linked service's address as a bare
 * hostname ("my-app.onrender.com") rather than a full URL. The `cors`
 * package and the browser's Origin header both need the scheme, so we
 * add https:// if it's missing. Leaves localhost/http URLs alone.
 */
function normalizeOrigin(value) {
  if (!value) return value;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

module.exports = {
  port: parseInt(process.env.PORT, 10) || 4000,
  corsOrigin: normalizeOrigin(process.env.CORS_ORIGIN) || 'http://localhost:5173',

  defaultUsername: process.env.DEFAULT_TIKTOK_USERNAME || '',
  defaultKeywords: parseList(process.env.DEFAULT_KEYWORDS, [
    'giveaway',
    'discount',
    'order',
    'interested',
    'price',
  ]),

  phone: {
    minDigits: parseInt(process.env.PHONE_MIN_DIGITS, 10) || 8,
    maxDigits: parseInt(process.env.PHONE_MAX_DIGITS, 10) || 15,
  },

  reconnect: {
    maxAttempts: parseInt(process.env.RECONNECT_MAX_ATTEMPTS, 10) || 5,
    delayMs: parseInt(process.env.RECONNECT_DELAY_MS, 10) || 4000,
  },

  connectTimeoutMs: parseInt(process.env.CONNECT_TIMEOUT_MS, 10) || 20000,

  logLevel: process.env.LOG_LEVEL || 'info',

  paths: {
    dataDir: require('path').join(__dirname, '..', 'data'),
    exportsDir: require('path').join(__dirname, '..', 'data', 'exports'),
    commentsFile: require('path').join(__dirname, '..', 'data', 'comments.json'),
    leadsFile: require('path').join(__dirname, '..', 'data', 'leads.json'),
  },
};
