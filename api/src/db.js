require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");
const userModel = require('./models/User');
const staffModel = require('./models/Staff');
const paymentModel = require('./models/Payment');
const accessModel = require('./models/Access');
const noticeModel = require('./models/Notice');
const classModel = require('./models/Class');
const userClassModel = require('./models/UserClass');
const planModel = require('./models/Plans');

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/systemgym`,
  { logging: false, native: false }
);

// Definimos los modelos
const User = userModel(sequelize);
const Staff = staffModel(sequelize);
const Payment = paymentModel(sequelize);
const Access = accessModel(sequelize);
const Notice = noticeModel(sequelize);
const Class = classModel(sequelize);
const UserClass = userClassModel(sequelize);
const Plans = planModel(sequelize);

// Definimos las relaciones
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Access, { foreignKey: 'userId' });
Access.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notice, { foreignKey: 'userId' });
Notice.belongsTo(User, { foreignKey: 'userId' });

// Relación muchos a muchos entre User y Class
User.belongsToMany(Class, { through: UserClass, foreignKey: 'userId' });
Class.belongsToMany(User, { through: UserClass, foreignKey: 'classId' });

// Relación muchos a muchos entre Plans y Class
Plans.belongsToMany(Class, { through: 'PlanClass', foreignKey: 'planId' });
Class.belongsToMany(Plans, { through: 'PlanClass', foreignKey: 'classId' });

// Relación muchos a muchos entre User y Plans
User.belongsToMany(Plans, { through: 'UserPlan', foreignKey: 'userId' });
Plans.belongsToMany(User, { through: 'UserPlan', foreignKey: 'planId' });

module.exports = {
  User,
  Staff,
  Payment,
  Access,
  Notice,
  Class,
  UserClass,
  Plans,
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
