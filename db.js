const mysql = require('mysql');

// Database configuration
const dbConfig = {
  host: 'sql11.freesqldatabase.com',
  user: 'sql11699613',
  password: 'wjtA5GqSGz',
  database: 'sql11699613',
  port: 3306
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
const query = (sql, params, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.message);
      return callback(err, null);
    }

    connection.query(sql, params, (err, results) => {
      connection.release(); // Release the connection

      if (err) {
        console.error('Error executing query: ' + err.message);
        return callback(err, null); // Pass error to the callback
      }

      callback(null, results); // Pass results to the callback
    });
  });
};

module.exports = { query };
