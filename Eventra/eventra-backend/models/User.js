const db = require('../config/db');

const createUser = async (username, email, passwordHash, role = 'admin') => {
  const [result] = await db.promise().execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, passwordHash, role]
  );
  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.promise().execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};