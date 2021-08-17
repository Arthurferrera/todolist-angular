const Sequelize = require('sequelize');
const database = require('../config/db');

const Task = database.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  descricao: Sequelize.STRING,
  responsible_email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  responsible_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  changed_pending: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Task;