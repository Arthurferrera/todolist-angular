const Task = require('../model/taskModel');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { keyword } = req.query;
    let whereQuery = {};

    if (keyword) {
      whereQuery = {
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { description: { [Op.like]: `%${keyword}%` } }
          ]
        }
      }
    }
    const tasks = await Task.findAll(whereQuery);
    return res.status(200).json(tasks);
  },

  async create(req, res) {
    const { title, description, responsible_name, responsible_email } = req.body;
    const result = await Task.create({ title, description, responsible_name, responsible_email });
    res.json(result);
  },

  async delete(req, res) {
    const { task_id } = req.query;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ error: 'Task not found' });
    }

    await Task.destroy({ where: { id: task_id } });
    res.json({ message: 'Task deleted successfully' });
  }
}
