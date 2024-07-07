const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Access = sequelize.define('Access', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    accessTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Access;
};
