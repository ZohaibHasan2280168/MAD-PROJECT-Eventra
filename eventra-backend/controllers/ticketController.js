const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const { event_id, type, price, available_quantity } = req.body;
    const ticketId = await Ticket.create({ event_id, type, price, available_quantity });
    res.status(201).json({ id: ticketId, message: 'Ticket created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTicketsByEventId = async (req, res) => {
  try {
    const tickets = await Ticket.getByEventId(req.params.event_id);
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.getById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { type, price, available_quantity } = req.body;
    await Ticket.update(req.params.id, { type, price, available_quantity });
    res.status(200).json({ message: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.delete(req.params.id);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};