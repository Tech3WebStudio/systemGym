require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");

const userModel = require("./models/User");
const staffModel = require("./models/Staff");
const paymentModel = require("./models/Payment");
const accessModel = require("./models/Access");
const noticeModel = require("./models/Notice");
const specialGroupModel = require("./models/SpecialGroup");
const userSpecialGroupsModel = require("./models/UserSpecialGroups");
const routineModel = require("./models/Routine");
const planModel = require("./models/Plan");
const stockModel = require("./models/Stock");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

// Definición de los modelos
const User = userModel(sequelize);
const Staff = staffModel(sequelize);
const Payment = paymentModel(sequelize);
const Access = accessModel(sequelize);
const Notice = noticeModel(sequelize);
const SpecialGroup = specialGroupModel(sequelize);
const UserSpecialGroups = userSpecialGroupsModel(sequelize);
const Routine = routineModel(sequelize);
const Plan = planModel(sequelize);
const Stock = stockModel(sequelize);

// Definimos las relaciones
User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Access, { foreignKey: "userId" });
Access.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Notice, { foreignKey: "userId" });
Notice.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Routine, { foreignKey: "userId" });
Routine.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(SpecialGroup, {
  through: UserSpecialGroups,
  foreignKey: "userId",
});
SpecialGroup.belongsToMany(User, {
  through: UserSpecialGroups,
  foreignKey: "specialGroupId",
});

Plan.hasMany(User, { foreignKey: "planId" });
User.belongsTo(Plan, { foreignKey: "planId" });

Staff.hasMany(Routine, { foreignKey: "staffId" });
Routine.belongsTo(Staff, { foreignKey: "staffId" });

Stock.hasMany(Payment, { foreignKey: "stockId" });
Payment.belongsTo(Stock, { foreignKey: "stockId" });

module.exports = {
  User,
  Staff,
  Payment,
  Access,
  Notice,
  SpecialGroup,
  UserSpecialGroups,
  Routine,
  Plan,
  Stock,
  conn: sequelize,
};
