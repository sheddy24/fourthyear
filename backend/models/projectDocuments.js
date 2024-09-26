// models/ProjectDocument.js

module.exports = (sequelize, DataTypes) => {
    const ProjectDocument = sequelize.define('ProjectDocument', {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      projectPlanPath: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contractAgreementPath: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    ProjectDocument.associate = (models) => {
      // Associate ProjectDocument with Project
      ProjectDocument.belongsTo(models.Project, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    };
  
    return ProjectDocument;
  };
  