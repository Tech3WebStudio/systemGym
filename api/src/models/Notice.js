const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notice = sequelize.define('Notice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Notice;
};
