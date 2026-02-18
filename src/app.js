const express = require('express');
const createTaskRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const { db } = require('./db');

const app = express();

app.use(express.json());

app.use('/api/tasks', createTaskRouter(db));

app.use(errorHandler);

module.exports = app;
