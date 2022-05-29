module.exports = {
  auth: (login, password) => `CALL auth('${login}', '${password}')`,
};
