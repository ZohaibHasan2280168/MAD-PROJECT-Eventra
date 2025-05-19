const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true // Allow multiple queries for debugging
});

connection.connect(err => {
  if (err) {
    console.error('\x1b[31m', '❌ MySQL Connection Error:', err.message, '\x1b[0m');
    process.exit(1);
  }
  console.log('\x1b[32m', '✅ MySQL Connected', '\x1b[0m');
  
  // Verify events table exists
  connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location VARCHAR(100) NOT NULL,
      description TEXT,
      organizer VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT IGNORE INTO events (name, date, time, location) 
    VALUES ('Default Event', CURDATE(), '10:00:00', 'Online');
  `, (err) => {
    if (err) {
      console.error('\x1b[31m', '❌ Table Creation Error:', err.message, '\x1b[0m');
    } else {
      console.log('\x1b[32m', '✅ Events Table Verified', '\x1b[0m');
    }
  });
});

// Enhanced query logging
connection.query = (function(original) {
  return function(sql, params, callback) {
    console.log('\x1b[36m', '📝 Executing Query:', sql, '\x1b[0m');
    if (params) console.log('   Parameters:', params);
    return original.call(this, sql, params, callback);
  };
})(connection.query);

module.exports = connection;