const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stock = sequelize.define('Stock', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    itemName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Stock;
};