const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify/sync');
const ExcelJS = require('exceljs');
const config = require('../config');
const logger = require('./logger');

function ensureExportsDir() {
  fs.mkdirSync(config.paths.exportsDir, { recursive: true });
}

function timestampSuffix() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Writes `rows` (array of flat objects) to a CSV file in the exports
 * directory and returns the absolute path to the created file.
 */
function exportToCsv(rows, baseName) {
  ensureExportsDir();
  const filePath = path.join(config.paths.exportsDir, `${baseName}-${timestampSuffix()}.csv`);
  const csv = stringify(rows, { header: true });
  fs.writeFileSync(filePath, csv);
  logger.info(`Exported ${rows.length} rows to CSV: ${filePath}`);
  return filePath;
}

/**
 * Writes `rows` to an .xlsx workbook (single sheet, styled header row)
 * and returns the absolute path to the created file.
 */
async function exportToExcel(rows, baseName, sheetName = 'Sheet1') {
  ensureExportsDir();
  const filePath = path.join(config.paths.exportsDir, `${baseName}-${timestampSuffix()}.xlsx`);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TikTok Live Monitor';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(sheetName);

  if (rows.length > 0) {
    sheet.columns = Object.keys(rows[0]).map((key) => ({
      header: key,
      key,
      width: Math.max(18, key.length + 4),
    }));
    sheet.addRows(rows);
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1C1F26' },
    };
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
  }

  await workbook.xlsx.writeFile(filePath);
  logger.info(`Exported ${rows.length} rows to Excel: ${filePath}`);
  return filePath;
}

module.exports = {
  exportToCsv,
  exportToExcel,
};
