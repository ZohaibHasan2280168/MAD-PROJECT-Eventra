const connection = require('../config/db');

class Ticket {
  static async create({ event_id, type, price, available_quantity }) {
    const [result] = await connection.promise().query(
      'INSERT INTO tickets (event_id, type, price, available_quantity) VALUES (?, ?, ?, ?)',
      [event_id, type, price, available_quantity]
    );
    return result.insertId;
  }

  static async getByEventId(event_id) {
    const [rows] = await connection.promise().query(
      'SELECT * FROM tickets WHERE event_id = ?',
      [event_id]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.promise().query(
      'SELECT * FROM tickets WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, { type, price, available_quantity }) {
    await connection.promise().query(
      'UPDATE tickets SET type = ?, price = ?, available_quantity = ? WHERE id = ?',
      [type, price, available_quantity, id]
    );
  }

  static async delete(id) {
    await connection.promise().query('DELETE FROM tickets WHERE id = ?', [id]);
  }
}

module.exports = Ticket;