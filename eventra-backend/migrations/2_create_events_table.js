const connection = require('../config/db');

const createEventsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location VARCHAR(100) NOT NULL,
      description TEXT,
      organizer VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await connection.promise().query(sql);
  console.log('Events table created');
};

createEventsTable();