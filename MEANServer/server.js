const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');

const port = process.env.PORT || 3000;

const app = express();

var corsOptions = {
  origin: true,
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', (req, res) => {
  res.send('Node API');
});

app.listen(port, () => {
  console.log('Server is running on localhost:' + port);
});