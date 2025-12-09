const fs = require('fs');
const path = require('path');

const EVENTS_FILE = path.join(__dirname, '..', 'data', 'events.json');

function readEvents() {
  const data = fs.readFileSync(EVENTS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeEvents(events) {
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
}

// Получить все события на сегодня
exports.getAllEvents = (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const events = readEvents().filter(e => e.date === today);
  res.json(events);
};

// Получить событие по ID
exports.getEventById = (req, res) => {
  const events = readEvents();
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ error: 'Событие не найдено' });
  res.json(event);
};

// Создать событие
exports.createEvent = (req, res) => {
  const events = readEvents();
  const newEvent = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || '',
    date: req.body.date || new Date().toISOString().split('T')[0],
    time: req.body.time || '00:00'
  };
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
};

// Обновить событие
exports.updateEvent = (req, res) => {
  const events = readEvents();
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Событие не найдено' });

  events[index] = { ...events[index], ...req.body };
  writeEvents(events);
  res.json(events[index]);
};

// Удалить событие
exports.deleteEvent = (req, res) => {
  let events = readEvents();
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Событие не найдено' });

  events = events.filter(e => e.id !== parseInt(req.params.id));
  writeEvents(events);
  res.json({ message: 'Событие удалено' });
};