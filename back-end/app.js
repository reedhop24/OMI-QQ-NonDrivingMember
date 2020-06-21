const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 400;
const getFields = require('./routes/getFields');
require('dotenv/config');

app.use('/', getFields);

mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to db'));

app.listen(port, () => {
    console.log('Server running on ' + port);
});