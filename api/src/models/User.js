const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: true },
    dni: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    role: {
      type: DataTypes.ENUM("user", "admin", "staff"),
      defaultValue: "user",
      allowNull: true,
    },hasPaid: { // Nuevo campo para controlar el pago de los usuarios
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    specialGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SpecialGroups', // Referencia al modelo de grupos
        key: 'id'
      },
      allowNull: true
    },
    planId: {  // Añadir este campo
      type: DataTypes.INTEGER,
      references: {
        model: 'Plan', // Asegúrate de que el nombre del modelo esté en singular o plural según tu configuración
        key: 'id'
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  });

  return User;
};
