const connection = require('../config/db');

class Event {
  // Create a new event
  static async create({ name, date, time, location, description, organizer, contact_info }) {
    try {
      const [result] = await connection.promise().query(
        'INSERT INTO events (name, date, time, location, description, organizer, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, date, time, location, description, organizer, contact_info]
      );
      return result.insertId;
    } catch (err) {
      console.error('CREATE EVENT ERROR:', err);
      throw err;
    }
  }

  // Get all events
  static async getAll() {
    try {
      const [rows] = await connection.promise().query(
        'SELECT * FROM events ORDER BY date ASC, time ASC'
      );
      return rows;
    } catch (err) {
      console.error('GET ALL EVENTS ERROR:', err);
      throw err;
    }
  }

  // Get single event by ID
  static async getById(id) {
    try {
      const [rows] = await connection.promise().query(
        'SELECT * FROM events WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error('GET EVENT BY ID ERROR:', err);
      throw err;
    }
  }

  // Update event
  static async update(id, { name, date, time, location, description, organizer, contact_info }) {
    try {
      const [result] = await connection.promise().query(
        'UPDATE events SET name = ?, date = ?, time = ?, location = ?, description = ?, organizer = ?, contact_info = ? WHERE id = ?',
        [name, date, time, location, description, organizer, contact_info, id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error('UPDATE EVENT ERROR:', err);
      throw err;
    }
  }

  // Delete event
  static async delete(id) {
    try {
      const [result] = await connection.promise().query(
        'DELETE FROM events WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (err) {
      console.error('DELETE EVENT ERROR:', err);
      throw err;
    }
  }
}

module.exports = Event;