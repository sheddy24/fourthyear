module.exports = (sequelize, DataTypes) => {
    const ProjectAssignment = sequelize.define("ProjectAssignment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    ProjectAssignment.associate = models => {
        ProjectAssignment.belongsTo(models.Project, {
            foreignKey: {
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        ProjectAssignment.belongsTo(models.users, {
            as: 'Manager',
            foreignKey: {
                allowNull: false,
                name: 'manager_id'
            },
            onDelete: 'CASCADE'
        });
        ProjectAssignment.belongsTo(models.users, {
            as: 'Supervisor',
            foreignKey: {
                allowNull: false,
                name: 'supervisor_id'
            },
            onDelete: 'CASCADE'
        });
        ProjectAssignment.belongsTo(models.users, {
            as: 'Worker',
            foreignKey: {
                allowNull: false,
                name: 'worker_id'
            },
            onDelete: 'CASCADE'
        });
    };

    return ProjectAssignment;
};
