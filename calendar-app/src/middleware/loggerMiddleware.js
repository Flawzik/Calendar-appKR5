const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next(); // Передаем управление следующему middleware или route
};

module.exports = loggerMiddleware;