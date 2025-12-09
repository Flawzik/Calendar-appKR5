// Временное хранилище событий (в памяти)
let events = [
  {
    id: 1,
    title: "Утренняя встреча",
    time: "09:00",
    category: "work",
    description: "Обсуждение проекта"
  },
  {
    id: 2,
    title: "Обед",
    time: "13:00",
    category: "personal",
    description: "С друзьями в кафе"
  }
];

// Генератор ID
const generateId = () => {
  return events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
};

// Получить все события
const getAllEvents = (req, res) => {
  res.json(events);
};

// Получить события на сегодня (упрощенно — все события)
const getTodayEvents = (req, res) => {
  res.json(events);
};

// Получить событие по ID
const getEventById = (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
};

// Добавить событие
const addEvent = (req, res) => {
  const { title, time, category, description } = req.body;
  if (!title || !time || !category) {
    return res.status(400).json({ error: 'Title, time and category are required' });
  }

  const newEvent = {
    id: generateId(),
    title,
    time,
    category,
    description: description || ""
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

// Удалить событие по ID
const deleteEvent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = events.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  events.splice(index, 1);
  res.json({ message: 'Event deleted successfully' });
};

// Фильтрация по категории
const getEventsByCategory = (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).json({ error: 'Category parameter is required' });
  }

  const filtered = events.filter(e => e.category === category);
  res.json(filtered);
};

module.exports = {
  getAllEvents,
  getTodayEvents,
  getEventById,
  addEvent,
  deleteEvent,
  getEventsByCategory
};