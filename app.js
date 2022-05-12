const express = require('express');
const mealRouter = require('./Routers/mealRouter');

const app = express();

app.use(express.json());

app.use('/api/meals', mealRouter);

module.exports = app;
