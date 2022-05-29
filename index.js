// Конфигурация сервера
const config = require('./config/config').SERVER;

const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const database = require('./public/scripts/utils/database');
const cookieParser = require('cookie-parser');

// Инициализация сервера
const app = express();

// Подключение шаблонизатора EJS
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, '/public')));

// Настройка формата передачи данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение использования cookies
app.use(cookieParser('secret key'));

// Обработка ошибок сервера
app.use((err, req, res, next) => {
  console.error(err);
  res.status(504).send('Server error');
});

routes(app);

// Запуск сервера
app.listen(config.PORT, config.URL, () =>
  console.log(`Server listening ${config.URL}:${config.PORT}...`),
);
