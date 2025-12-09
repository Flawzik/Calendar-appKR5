const express = require('express');
const path = require('path');
const loggerMiddleware = require('./src/middleware/loggerMiddleware');
const eventRoutes = require('./src/routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware); // Собственный middleware
app.use(express.static(path.join(__dirname, 'public'))); // Статические файлы

// Routes
app.use('/api', eventRoutes);

// Главная страница (статический HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 обработчик
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});