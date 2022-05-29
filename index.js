const config = require('./config/config').SERVER;
const express = require('express');
const app = express();

app.listen(config.PORT, config.URL, () =>
  console.log(`Server listening ${config.URL}:${config.PORT}...`),
);