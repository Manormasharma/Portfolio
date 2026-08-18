require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const chatHandler = require('./api/chat');

const app = express();
app.use(express.json());
app.use(cors());

app.all('/api/chat', (req, res) => chatHandler(req, res));

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`));
