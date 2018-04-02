require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.get('/api/test', (req, res) => {
  res.status(200).send('Trevor')
})

const port = 3333
app.listen(port, () => console.log(`listening on port ${port}`));