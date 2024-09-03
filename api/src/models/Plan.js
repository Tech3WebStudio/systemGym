const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plan = sequelize.define('Plan', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    planType: { type: DataTypes.ENUM('family', 'individual', 'daily'), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Plan;
};
