const connection = require('../config/db');

const createTicketsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      event_id INT NOT NULL,
      type VARCHAR(50) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      available_quantity INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    )
  `;
  await connection.promise().query(sql);
  console.log('Tickets table created');
};

createTicketsTable();