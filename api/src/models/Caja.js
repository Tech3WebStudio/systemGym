const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Caja = sequelize.define('Caja', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    staffId: { type: DataTypes.INTEGER, allowNull: false },
    totalIncome: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    totalExpense: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Caja;
};
