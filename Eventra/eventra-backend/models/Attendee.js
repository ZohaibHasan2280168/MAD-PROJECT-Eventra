const connection = require('../config/db');

class Attendee {
  static async create({ event_id, ticket_id, name, email, phone, ticket_type }) {
    try {
        const [result] = await connection.promise().query(
            'INSERT INTO attendees (event_id, ticket_id, name, email, phone, ticket_type) VALUES (?, ?, ?, ?, ?, ?)',
            [event_id, ticket_id, name, email, phone, ticket_type]
        );
        return result.insertId;
    } catch (err) {
        console.error('MODEL CREATE ERROR:', err);
        throw err;
    }
}
  static async getByEventId(event_id) {
    const [rows] = await connection.promise().query(
      'SELECT * FROM attendees WHERE event_id = ?',
      [event_id]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.promise().query(
      'SELECT * FROM attendees WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, email, phone, ticket_type }) {
    await connection.promise().query(
        'UPDATE attendees SET name = ?, email = ?, phone = ?, ticket_type = ? WHERE id = ?',
        [name, email, phone, ticket_type, id]
    );
}

  static async delete(id) {
    await connection.promise().query('DELETE FROM attendees WHERE id = ?', [id]);
  }
}

module.exports = Attendee;