const dbConnection = require('../config/db');
const Task = require('../model/taskModel');

module.exports = {
  async index(req, res) {
    const sql = `SELECT * FROM task`;
    const result = await dbConnection.query(sql);
    res.json(result);
  },

  async create(req, res) {
    const result = await Task.create(req.body);
    res.json(result);
  }
}

// Criar uma task a partir do front, validando e-mail e da forma correta,
// arrumando estrutura, validações, comentários
