require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const JSONCtrl = require('./JSONServerController');
const GLCtrl = require('./GLController')

const app = express();
app.use(bodyParser.json());

app.get('/api/search', GLCtrl.search);
app.post('/api/add', GLCtrl.add)
app.get('/api/projects', GLCtrl.getProjects)

app.get('/api/getInfo', JSONCtrl.getInfo);
app.post('/api/addStudent', JSONCtrl.addStudent);

const port = 3333
app.listen(port, () => console.log(`listening on port ${port}`));