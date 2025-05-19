const express = require('express');
const { 
  createAttendee, 
  getAttendeesByEventId, 
  getAttendeeById, 
  updateAttendee, 
  deleteAttendee 
} = require('../controllers/attendeeController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, createAttendee);
router.get('/event/:event_id', authenticateToken, getAttendeesByEventId);
router.get('/:id', authenticateToken, getAttendeeById);
router.put('/:id', authenticateToken, updateAttendee);
router.delete('/:id', authenticateToken, deleteAttendee);


module.exports = router;