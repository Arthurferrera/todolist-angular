const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

const Task = require('../model/taskModel');

const connection = new Sequelize(dbConfig);

Task.init(connection);
// const sequelize = new Sequelize('todolist', 'root', 'root', { dialect: 'mysql', host: 'localhost' });

module.exports = connection;