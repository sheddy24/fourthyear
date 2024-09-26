module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    taskid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    taskname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'incomplete' // Set default value to 'incomplete'
    }
  }, {
    tableName: 'tasks',
    timestamps: false
  });

  // Define association with the Projects model
  Task.associate = (models) => {
    Task.belongsTo(models.Project, { 
      foreignKey: 'projectid',
      onDelete: 'CASCADE', // Cascade delete behavior
      onUpdate: 'CASCADE' // Cascade update behavior
    });
  };

  return Task;
};
