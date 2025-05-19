const Attendee = require('../models/Attendee');

exports.createAttendee = async (req, res) => {
    try {
        console.log('REQ BODY:', req.body);
        const { event_id, ticket_id, name, email, phone, ticket_type } = req.body;
        const attendeeId = await Attendee.create({ event_id, ticket_id, name, email, phone, ticket_type });
        console.log('ATTENDEE ID:', attendeeId);
        res.status(201).json({ id: attendeeId, message: 'Attendee registered successfully' });
    } catch (err) {
        console.error('REGISTER ATTENDEE ERROR:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAttendeesByEventId = async (req, res) => {
  try {
    const attendees = await Attendee.getByEventId(req.params.event_id);
    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendeeById = async (req, res) => {
  try {
    const attendee = await Attendee.getById(req.params.id);
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    res.status(200).json(attendee);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAttendee = async (req, res) => {
    try {
        const { name, email, phone, ticket_type } = req.body;
        await Attendee.update(req.params.id, { name, email, phone, ticket_type });
        res.status(200).json({ message: 'Attendee updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteAttendee = async (req, res) => {
  try {
    await Attendee.delete(req.params.id);
    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};