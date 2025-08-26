// ...existing code...
// Configuration loader for environment variables
require('dotenv').config();

module.exports = {
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
// ...existing code...
