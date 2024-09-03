const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SpecialGroup = sequelize.define('SpecialGroup', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return SpecialGroup;
};