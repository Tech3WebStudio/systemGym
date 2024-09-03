const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserSpecialGroups = sequelize.define('UserSpecialGroups', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    specialGroupId: { type: DataTypes.INTEGER, allowNull: false }
  });

  return UserSpecialGroups;
};
