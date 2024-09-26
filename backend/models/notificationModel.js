// models/notification.js

module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return Notification;
  };
  