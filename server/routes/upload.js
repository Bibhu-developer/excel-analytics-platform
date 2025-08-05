const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const router = express.Router();

// Store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse Excel file' });
  }
});

module.exports = router;
