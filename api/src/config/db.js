const Sequelize = require('sequelize');
const sequelize = new Sequelize('todolist', 'root', 'root', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;