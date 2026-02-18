const express = require('express');
const path = require('path');
const createTaskRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const { db } = require('./db');

const app = express();

app.use(express.json());

app.use('/api/tasks', createTaskRouter(db));

// Serve React frontend in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.use(errorHandler);

module.exports = app;
