// models/resourceAllocation.js
module.exports = (sequelize, DataTypes) => {
    const ResourceAllocation = sequelize.define('ResourceAllocation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    ResourceAllocation.associate = models => {
        // ResourceAllocation belongs to Project
        ResourceAllocation.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectId',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        
        // ResourceAllocation belongs to Inventory
        ResourceAllocation.belongsTo(models.Inventory, {
            foreignKey: {
                name: 'resourceId',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return ResourceAllocation;
};
