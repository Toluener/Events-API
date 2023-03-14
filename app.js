const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const approuter = require('./routes/routes');
const user = require('./routes/user');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/user', user);

app.use(approuter);

const port = process.env.PORT || 3001;
app.listen(port, () => {console.log(`listening on port ${port}...`)});
