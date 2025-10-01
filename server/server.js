// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Example route
app.get('/', (req, res) => {
  res.send('Server is running ');
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is listening on http://localhost:${PORT}`);
});
