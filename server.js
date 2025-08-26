require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/auth');
const linksRoutes = require('./routes/links');
const profileRoutes = require('./routes/profile');

// Middleware
app.use(express.json()); // for parsing application/json

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/profile', profileRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
