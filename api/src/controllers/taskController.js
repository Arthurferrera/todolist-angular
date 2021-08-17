const dbConnection = require('../config/db');

module.exports = {
  async index(req, res) {
    const sql = `SELECT * FROM task`;
    const result = await dbConnection.query(sql);
    res.json(result);
  },

  async create(req, res) {
    const sql = `INSERT INTO task (title, description, responsible_email, responsible_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    const result = await dbConnection.query(sql, [req.body.title, req.body.description, req.body.responsible_email, req.body.responsible_name]);
    res.json(result);
  }
}