$(document).ready(function () {
  // Обработчик нажатия на кнопку Помощь
  $('#help-button').click(function (e) {
    alert('Для получения логина и пароля обратитесь к администратору');
  });

  // Обработчик нажатия на кнопку Войти
  $('#auth-button').click(function (e) {
    // Логин и пароль
    const login = $('#login').val();
    const password = $('#password').val();

    // Очистка поля ввода пароля
    $('#password').val('');

    // Запрос на авторизацию
    post('/api/auth', { login, password })
      .then((value) => {
        console.log(value);
      })
      .catch((error) => console.error(error));
  });
});
