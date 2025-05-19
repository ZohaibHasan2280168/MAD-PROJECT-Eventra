const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllEvents);         // List all events
router.get('/:id', getEventById);      // Get event details

// Protected routes (require JWT)
router.post('/', authenticateToken, createEvent);         // Create event
router.put('/:id', authenticateToken, updateEvent);       // Update event
router.delete('/:id', authenticateToken, deleteEvent);    // Delete event

module.exports = router;