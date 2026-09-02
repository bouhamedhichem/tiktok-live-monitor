const express = require('express');
const cors = require('cors');
const http = require('http');

const config = require('./config');
const logger = require('./services/logger');
const { TikTokMonitor } = require('./services/tiktokService');
const attachWebSocket = require('./websocket');
const buildApiRouter = require('./routes/api');

const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// One shared monitor instance for the whole process — this app is designed
// to watch a single room at a time from a single dashboard/team.
const monitor = new TikTokMonitor();

app.use('/api', buildApiRouter(monitor));

app.use((err, req, res, next) => {
  logger.error(`Unhandled request error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

const httpServer = http.createServer(app);
attachWebSocket(httpServer, monitor);

httpServer.listen(config.port, '0.0.0.0', () => {
  logger.info(`TikTok Live Monitor backend listening on http://0.0.0.0:${config.port}`);
});

// Graceful shutdown so the TikTok connection is closed cleanly.
process.on('SIGINT', async () => {
  logger.info('Shutting down...');
  await monitor.disconnect();
  process.exit(0);
});
