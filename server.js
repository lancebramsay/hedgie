/**
 * Hedgie self-hosted sync server
 *
 * A minimal Node.js/Express endpoint that stores a single Hedgie
 * backup payload as a JSON file on disk.
 *
 * Usage:
 *   npm install express
 *   HEDGIE_TOKEN=your-secret node server.js
 *
 * Then in Hedgie settings:
 *   Provider: Self-hosted
 *   URL: http://your-server:3000/hedgie
 *   Token: your-secret (optional)
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.HEDGIE_TOKEN; // leave unset to disable auth
const DATA_FILE = path.join(__dirname, 'hedgie-data.json');

app.use(express.json({ limit: '200kb' }));

// Optional CORS for browser access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Auth middleware
function auth(req, res, next) {
  if (!TOKEN) return next();
  const header = req.headers.authorization;
  if (header === `Bearer ${TOKEN}`) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// GET — return stored payload
app.get('/hedgie', auth, (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json({ _hedgie: true, version: 0 });
  }
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to read data file' });
  }
});

// PUT — store payload
app.put('/hedgie', auth, (req, res) => {
  const payload = req.body;
  if (!payload || !payload._hedgie) {
    return res.status(400).json({ error: 'Invalid Hedgie payload' });
  }
  try {
    // Keep a rolling backup of the previous version
    if (fs.existsSync(DATA_FILE)) {
      const prev = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const backupPath = DATA_FILE.replace('.json', `-v${prev.version || 0}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(prev, null, 2));
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2));
    res.json({ ok: true, version: payload.version });
  } catch (e) {
    res.status(500).json({ error: 'Failed to write data file' });
  }
});

app.listen(PORT, () => {
  console.log(`Hedgie sync server running on port ${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/hedgie`);
  if (!TOKEN) {
    console.log('Warning: No HEDGIE_TOKEN set — endpoint is unauthenticated');
  }
});
