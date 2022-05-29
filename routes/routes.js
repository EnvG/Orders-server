// Страницы приложения
const { process_params } = require('express/lib/router');
const client = require('./client/client');
const database = require('../public/scripts/utils/database');

module.exports = (app) => {
  // #region Страницы приложения
  // Страница авторизации
  app.get(client.auth.endpoint, client.auth.get);
  // #endregion

  app.post(database.auth.endpoint, database.auth.post);
};
