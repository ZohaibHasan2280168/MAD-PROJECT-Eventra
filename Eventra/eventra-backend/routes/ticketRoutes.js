const express = require('express');
const { 
  createTicket, 
  getTicketsByEventId, 
  getTicketById, 
  updateTicket, 
  deleteTicket 
} = require('../controllers/ticketController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, createTicket);           // Protected
router.get('/event/:event_id', getTicketsByEventId);         // Public
router.get('/:id', getTicketById);                           // Public
router.put('/:id', authenticateToken, updateTicket);         // Protected
router.delete('/:id', authenticateToken, deleteTicket);      // Protected

module.exports = router;