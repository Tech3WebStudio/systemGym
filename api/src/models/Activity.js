const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserActivities = sequelize.define('UserActivities', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    activityId: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true } // Controla si la actividad sigue activa
  });

  return UserActivities;
};
