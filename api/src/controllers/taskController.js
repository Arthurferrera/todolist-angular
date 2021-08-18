const Task = require('../model/taskModel');

module.exports = {
  async index(req, res) {
    const tasks = await Task.findAll();
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
