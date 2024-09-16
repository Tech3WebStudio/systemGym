const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserSpecialGroups = sequelize.define('UserSpecialGroups', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    specialGroupId: { type: DataTypes.INTEGER, allowNull: false },
    discount: { type: DataTypes.DECIMAL(5, 2), allowNull: true }, // Descuento en porcentaje
    benefits: { type: DataTypes.STRING, allowNull: true }
  });

  return UserSpecialGroups;
};
