const dbConfig = require('../../../config/config').DATABASE;
const mysql = require('mysql');

const queries = require('./queries');

let connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  try {
    if (err) {
      console.error('---- Database connection failed ----');
      throw err;
    } else {
      console.error('Database connection success');
    }
  } catch (err) {
    console.error({ errno: err.errno, message: err.sqlMessage });
  }
});

module.exports = {
  auth: {
    endpoint: '/api/auth',
    post: (req, res) => {
      const { login, password } = req.body;

      // Если в запросе имеются значения логина и пароля,
      if (login && password) {
        // то отправить запрос на авторизацию
        connection.query(queries.auth(login, password), function (err, rows) {
          let result = rows && rows[0] && rows[0][0] ? rows[0][0] : null;

          // Если запрос вернул ответ,
          if (result) {
            // то установить cookies
            res.cookie('token', result.token, {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            res.cookie('key', result['_key'], {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            res.status(200).send();
          } else {
            // иначе вернуть сообщение
            res.status(400).json({ message: 'Неверный логин или пароль' });
          }
        });
      } else {
        // Если в запросе не имеется требуемых полей, то вернуть сообщение о неверном запросе
        res.status(400).json({ message: 'Заполните все поля' });
      }
    },
  },
};
