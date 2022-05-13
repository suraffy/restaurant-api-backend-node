const express = require('express');
const mealRouter = require('./Routers/mealRouter');
const userRouter = require('./Routers/userRouter');

const app = express();

app.use(express.json());

app.use('/api/meals', mealRouter);
app.use('/api/users', userRouter);

module.exports = app;
