const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection module

// Endpoint for storing user details
router.post('/attendance', (req, res) => {
  console.log('in attendance API')
  const { userName, services, inTime, outTime, totalCost } = req.body;
  const generatedAt = new Date();
  console.log(userName + services)
  // SQL query to insert user details into the database
  const sql = 'INSERT INTO attendance (userName, services, inTime, outTime, totalCost, generatedAt) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [userName, services, inTime, outTime, totalCost, generatedAt];

  // Execute the SQL query using the database connection module
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error storing user details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Details stored successfully' });
  });
});

// Endpoint for retrieving all stored user details
router.get('/attendance', (req, res) => {
  // SQL query to retrieve all user details from the database
  const sql = 'SELECT * FROM attendance';

  // Execute the SQL query using the database connection module
  db.query(sql, [], (err, results) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

module.exports = router;
