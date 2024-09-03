const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Routine = sequelize.define('Routine', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Routine;
};
