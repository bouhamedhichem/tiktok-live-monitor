const { Server } = require('socket.io');
const config = require('../config');
const logger = require('./../services/logger');
const storage = require('../services/storageService');

/**
 * Attaches Socket.IO to the HTTP server and wires the TikTokMonitor
 * instance's events to every connected dashboard client. Also handles
 * the commands the dashboard sends back (connect/pause/resume/clear).
 */
function attachWebSocket(httpServer, monitor) {
  const io = new Server(httpServer, {
    cors: { origin: config.corsOrigin, methods: ['GET', 'POST'] },
  });

  // Forward monitor events to every connected client. There is normally
  // one dashboard tab, but broadcasting keeps multiple tabs in sync too.
  monitor.on('status', (payload) => io.emit('status', payload));
  monitor.on('comment', (comment) => io.emit('comment', comment));
  monitor.on('lead', (payload) => io.emit('lead', payload));
  monitor.on('keyword-match', (payload) => io.emit('keyword-match', payload));

  io.on('connection', (socket) => {
    logger.info(`Dashboard client connected (${socket.id})`);

    // Send current state + backlog so a newly opened/refreshed dashboard
    // catches up instantly instead of starting blank.
    socket.emit('bootstrap', {
      state: monitor.getState(),
      comments: storage.getComments(),
      leads: storage.getLeads(),
    });

    socket.on('connect-room', async ({ username, keywords } = {}) => {
      if (!username) {
        socket.emit('status', { status: 'error', message: 'A TikTok username is required.' });
        return;
      }
      if (Array.isArray(keywords)) monitor.setKeywords(keywords);
      try {
        await monitor.connect(username);
      } catch (err) {
        // status/error already emitted by the monitor itself
      }
    });

    socket.on('pause', () => monitor.pause());
    socket.on('resume', () => monitor.resume());
    socket.on('disconnect-room', () => monitor.disconnect());

    socket.on('update-keywords', (keywords) => {
      if (Array.isArray(keywords)) monitor.setKeywords(keywords);
    });

    socket.on('clear-data', () => {
      storage.clearAll();
      io.emit('cleared');
      logger.info('Comment and lead history cleared by user');
    });

    socket.on('disconnect', () => {
      logger.info(`Dashboard client disconnected (${socket.id})`);
    });
  });

  return io;
}

module.exports = attachWebSocket;
