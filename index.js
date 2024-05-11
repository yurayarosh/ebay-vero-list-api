const express = require('express');
const { getList } = require('./getList');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/list', (req, res) => {
  getList(res);
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
