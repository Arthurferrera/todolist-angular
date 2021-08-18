const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      responsible_name: DataTypes.STRING,
      responsible_email: DataTypes.STRING,
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      changed_pending: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    }, {
      sequelize,
      modelName: 'task',
    })
  }
}

module.exports = Task;