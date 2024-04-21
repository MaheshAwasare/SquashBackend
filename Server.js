const express = require('express');
const db = require('./db'); 
const app = express();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
  });


// Endpoint to execute SQL query
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM UserDetails';
  
    db.query(sql, [], (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json(results);
    });
  });


  //Start the server
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
