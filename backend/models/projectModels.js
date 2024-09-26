module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending", // Default status for new projects
    },
  });

  Project.associate = (models) => {
    Project.hasOne(models.ProjectUpdate, {
      foreignKey: "projectId", // Use the same foreign key as defined in ProjectUpdate
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Project.hasMany(models.Task, { foreignKey: "projectid",onDelete: "CASCADE" });
    // You can add other associations here if needed

    Project.hasMany(models.ProjectAssignment, { foreignKey: "ProjectId", onDelete: "CASCADE" });
  };

  return Project;
};
