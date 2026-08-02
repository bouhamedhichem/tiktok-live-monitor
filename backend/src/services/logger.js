const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('../config');

// Make sure the data directory exists before winston tries to write into it.
if (!fs.existsSync(config.paths.dataDir)) {
  fs.mkdirSync(config.paths.dataDir, { recursive: true });
}

const logFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
  const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level.toUpperCase()}] ${message}${extra}`;
});

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(config.paths.dataDir, 'app.log'),
      maxsize: 5 * 1024 * 1024, // 5MB, then winston starts a new file
      maxFiles: 3,
    }),
    new winston.transports.File({
      filename: path.join(config.paths.dataDir, 'errors.log'),
      level: 'error',
    }),
  ],
});

module.exports = logger;
