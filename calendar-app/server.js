const express = require('express');
const path = require('path');
const eventsRouter = require('./routes/events');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Собственное middleware — логгер запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Раздача статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.use('/api/events', eventsRouter);

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});