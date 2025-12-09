const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events — все события
router.get('/events', eventController.getAllEvents);

// GET /api/events/today — события на сегодня
router.get('/events/today', eventController.getTodayEvents);

// GET /api/events/:id — событие по ID
router.get('/events/:id', eventController.getEventById);

// GET /api/events?category=... — фильтрация по категории
router.get('/events', eventController.getEventsByCategory);

// POST /api/events — добавить событие
router.post('/events', eventController.addEvent);

// DELETE /api/events/:id — удалить событие
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;