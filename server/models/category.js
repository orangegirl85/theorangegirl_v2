module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    parentId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('JOB', 'PERSONAL'),
      allowNull: false,
    },
    specificUrl: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      // associate: (models) => {
      //   Todo.hasMany(models.TodoItem, {
      //     foreignKey: 'todoId',
      //     as: 'todoItems',
      //   });
      // },
    },
  });
  return Category;
};
