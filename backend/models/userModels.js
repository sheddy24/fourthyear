module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    users.associate = models => {
        users.hasOne(models.ProjectAssignment, {
            as: 'Worker', // Match the alias used in the association
            foreignKey: 'worker_id',
            onDelete: 'CASCADE' // Cascade delete behavior
        });
    };

    return users;
};
