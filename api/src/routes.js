const express = require('express');

const taskController = require('./controllers/taskController');

// create routes
const routes = express.Router();

// routes
routes.get('/tasks', taskController.index);
routes.post('/tasks', taskController.create);
routes.delete('/tasks', taskController.delete);

module.exports = routes;