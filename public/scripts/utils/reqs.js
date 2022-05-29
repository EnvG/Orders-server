// POST-запрос
async function post(route, data) {
  await fetch(`${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
      } else {
        return response.json();
      }
    })
    .then((value) => {
      if (value) {
        alert(value.message);
      }
    });
}
