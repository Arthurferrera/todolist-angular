const Task = require('../model/taskModel');
const { Op } = require('sequelize');

module.exports = {
  async index(req, res) {
    const { keyword } = req.query;
    let options = {
      where: {},
      order: [['updated_at', 'DESC']]
    };

    if (keyword) {
      options.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } }
        ]
      }
    }
    const tasks = await Task.findAll(options);
    return res.status(200).json(tasks);
  },

  async create(req, res) {
    const { title, description, responsible_name, responsible_email } = req.body;
    const result = await Task.create({ title, description, responsible_name, responsible_email });
    res.json(result);
  },

  async update(req, res) {
    const { task_id, done } = req.body;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ type: 'not_found', error: 'Task not found' });
    }

    if (task.changed_pending >= 2 && !done) {
      return res.status(400).json({ type: 'exceded_limit_change_for_pending', error: 'The task exceded limit change for pending' });
    }

    let objectUpdate = { done: done };
    if (!done) {
      objectUpdate = { done: done, changed_pending: task.changed_pending + 1 }
    }

    console.log(objectUpdate);
    await Task.update(objectUpdate, { where: { id: task_id } });

    res.status(200).json({});
  },

  async delete(req, res) {
    const { task_id } = req.query;

    const task = await Task.findByPk(task_id);

    if (!task) {
      return res.status(400).json({ type: 'not_found', error: 'Task not found' });
    }

    await Task.destroy({ where: { id: task_id } });
    res.json({ message: 'Task deleted successfully' });
  }
}
