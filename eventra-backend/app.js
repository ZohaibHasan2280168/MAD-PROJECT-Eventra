const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const attendeeRoutes = require('./routes/attendeeRoutes');
const connection = require('./config/db'); // Import database connection
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// // Enhanced Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Request logging middleware (add this before routes)
// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
//   next();
// });

// Database connection test route (temporary - for debugging)
// Test Route (add this before other middleware)
// app.get('/api/test-db', async (req, res) => {
//   try {
//     const [rows] = await connection.promise().query('SELECT 1 + 1 AS solution');
//     res.json({ 
//       status: 'Database connected',
//       solution: rows[0].solution,
//       tables: await checkTables() 
//     });
//   } catch (err) {
//     console.error('Database test failed:', err);
//     res.status(500).json({ 
//       error: 'Database connection failed',
//       details: err.message 
//     });
//   }
// });

// async function checkTables() {
//   try {
//     const [tables] = await connection.promise().query('SHOW TABLES');
//     return tables.map(t => t.Tables_in_eventra_db);
//   } catch (err) {
//     return `Error checking tables: ${err.message}`;
//   }
// }

// // Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/attendees', attendeeRoutes);

// filepath: eventra-backend/app.js
app.get('/api/ping', (req, res) => res.json({ status: 'ok' }));
// Debug endpoint (optional)
app.get('/api/debug', (req, res) => {
  res.json({ status: 'Backend is working!' });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not foundiiiiii' });
});


// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;

// // 404 Handler (add this before error handler)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server error iiiiii' });
// });

// // Enhanced Error Handler
// app.use((err, req, res, next) => {
//   console.error('\x1b[31m', '❌ Error:', err.stack, '\x1b[0m');
  
//   res.status(500).json({
//     message: 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined,
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// });

// module.exports = app;

// app.js
// app.get('/api/debug', async (req, res) => {
//   try {
//     // Test connection
//     const [dbTest] = await connection.promise().query('SELECT 1 + 1 AS solution');
    
//     // Test events table
//     const [tables] = await connection.promise().query('SHOW TABLES LIKE "events"');
//     const [events] = await connection.promise().query('SELECT * FROM events');
    
//     res.json({
//       dbConnected: dbTest[0].solution === 2,
//       eventsTableExists: tables.length > 0,
//       eventCount: events.length,
//       sampleEvent: events[0] || null,
//       env: {
//         dbHost: process.env.DB_HOST,
//         dbUser: process.env.DB_USER,
//         dbName: process.env.DB_NAME
//       }
//     });
//   } catch (err) {
//     console.error('Debug error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = app;