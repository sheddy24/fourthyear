module.exports = (sequelize, DataTypes) => {
  const WorkerRegister = sequelize.define("WorkerRegister", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('present', 'absent'),
      allowNull: false
    },
    approvalStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'disapproved'),
      allowNull: true, // Allow null initially until supervisor approves/disapproves
      defaultValue: 'pending' // Default value is 'pending'
    }
  });


  WorkerRegister.associate = models => {
    WorkerRegister.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE' // Cascade delete behavior for users association
    });
    WorkerRegister.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE' // Cascade delete behavior for Project association
    });
  };

  return WorkerRegister;
};
