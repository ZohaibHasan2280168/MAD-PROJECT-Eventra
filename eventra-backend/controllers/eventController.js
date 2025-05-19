const db = require('../config/db');
const Event = require('../models/Event');
// CREATE Event (Protected)
exports.createEvent = async (req, res) => {
  try {
    const { name, date, time, location, description, organizer, contact_info } = req.body;
    if (!name || !date || !time || !location) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    const [result] = await db.promise().execute(
      'INSERT INTO events (name, date, time, location, description, organizer, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, date, time, location, description, organizer, contact_info]
    );
    res.status(201).json({ message: 'Event created', eventId: result.insertId });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

// READ All Events (Public)
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await db.promise().execute('SELECT * FROM events ORDER BY date DESC');
    res.json(events);
  } catch (err) {
    console.error('Get all events error:', err);
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

// READ Event by ID (Public)
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().execute('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Get event by ID error:', err);
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
};

// UPDATE Event (Protected)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, location, description, organizer, contact_info } = req.body;
    const [result] = await db.promise().execute(
      'UPDATE events SET name=?, date=?, time=?, location=?, description=?, organizer=?, contact_info=? WHERE id=?',
      [name, date, time, location, description, organizer, contact_info, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event updated' });
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
};

// DELETE Event (Protected)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.promise().execute('DELETE FROM events WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};