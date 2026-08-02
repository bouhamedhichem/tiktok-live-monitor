const express = require('express');
const path = require('path');
const storage = require('../services/storageService');
const { exportToCsv, exportToExcel } = require('../services/exportService');
const logger = require('../services/logger');
const config = require('../config');

function buildRouter(monitor) {
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.json({ ok: true, state: monitor.getState() });
  });

  router.get('/comments', (req, res) => {
    res.json(storage.getComments());
  });

  router.get('/leads', (req, res) => {
    res.json(storage.getLeads());
  });

  router.get('/config/keywords', (req, res) => {
    res.json({ keywords: monitor.getState().keywords });
  });

  router.post('/config/keywords', (req, res) => {
    const { keywords } = req.body;
    if (!Array.isArray(keywords)) {
      return res.status(400).json({ error: 'keywords must be an array of strings' });
    }
    monitor.setKeywords(keywords);
    res.json({ keywords });
  });

  // --- Exports --------------------------------------------------------
  // `type` is "comments" or "leads", `format` is "csv" or "xlsx".

  router.get('/export/:type/:format', async (req, res) => {
    const { type, format } = req.params;

    const rows = type === 'leads' ? storage.getLeads() : storage.getComments();
    if (!['comments', 'leads'].includes(type)) {
      return res.status(400).json({ error: 'type must be "comments" or "leads"' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: `No ${type} to export yet.` });
    }

    try {
      let filePath;
      if (format === 'csv') {
        filePath = exportToCsv(rows, type);
      } else if (format === 'xlsx') {
        filePath = await exportToExcel(rows, type, type === 'leads' ? 'Leads' : 'Comments');
      } else {
        return res.status(400).json({ error: 'format must be "csv" or "xlsx"' });
      }
      res.download(filePath, path.basename(filePath));
    } catch (err) {
      logger.error(`Export failed (${type}.${format}): ${err.message}`);
      res.status(500).json({ error: 'Export failed. Check server logs for details.' });
    }
  });

  router.post('/clear', (req, res) => {
    storage.clearAll();
    logger.info('Data cleared via REST endpoint');
    res.json({ ok: true });
  });

  router.get('/defaults', (req, res) => {
    res.json({
      username: config.defaultUsername,
      keywords: config.defaultKeywords,
    });
  });

  return router;
}

module.exports = buildRouter;
