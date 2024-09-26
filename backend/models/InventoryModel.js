module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER, // Assuming quantity is an integer
        allowNull: false
      },
      description: {
        type: DataTypes.STRING, // Adjust data type according to your needs
        allowNull: true // Adjust allowNull according to your requirements
      },
      unit:{
        type:DataTypes.STRING,
        allowNull:false
      }
    });
  
    return Inventory;
  };
  