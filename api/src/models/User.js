const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: true },
    dni: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    picture: { type: DataTypes.STRING, allowNull: true },
    role: {
      type: DataTypes.ENUM("user", "admin", "staff"),
      defaultValue: "user",
      allowNull: true,
    },
    hasPaid: {
      // Nuevo campo para controlar el pago de los usuarios
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    specialGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: "SpecialGroups",
        key: "id",
      },
      allowNull: true,
    },
    planId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Plan",
        key: "id",
      },
      allowNull: true,
      onDelete: "SET NULL",
    },
  });

  return User;
};
