const express = require('express');
const { getList } = require('./getList');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
let list = [];
const millisecondsInDay = 1000 * 60 * 60 * 24;

(async () => {
  list = await getList();
})();

setInterval(async () => {
  list = await getList();
}, millisecondsInDay);

app.get('/list', (req, res) => {
  list.length > 0 ? res.status(200).json(list) : res.status(500).json("Couldn't get the list");
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
