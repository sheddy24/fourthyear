// models/ProjectUpdate.js
module.exports = (sequelize, DataTypes) => {
    const ProjectUpdate = sequelize.define("ProjectUpdate", {
        progress: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        budgetused: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    ProjectUpdate.associate = (models) => {
        ProjectUpdate.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                allowNull: false // Ensure project ID is required
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    return ProjectUpdate;
};
