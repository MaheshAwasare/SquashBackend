const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); 
const app = express();
const port = process.env.PORT || 4000;
// Middleware to parse JSON bodies
app.use(express.json());
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
  app.use((req, res, next) => {
    console.log('Request body:', req.body);
    next();
  });
  

  // Endpoint for user login
  app.post('/login', async (req, res) => {
    console.log('Request body:', req.body);
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      // Query the database to find the user by username
      const sql = 'SELECT * FROM UserDetails WHERE username = ?';
      db.query(sql, [username], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Check if user exists
        if (!results.length) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const user = results[0];
  
        // Compare the provided password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (error, passwordMatch) => {
          if (error) {
            console.error('Error comparing passwords:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
  
          // If the password matches, generate a JWT token
          const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: '1h' });
  
          // Send the token in the response
          res.json({ token });
        });
      });
    } catch (error) {
      // This catch block will only catch errors outside of the callbacks
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  //Start the server
   app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
