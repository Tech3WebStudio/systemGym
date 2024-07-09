require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");
const userModel = require('./models/User');
const staffModel = require('./models/Staff');
const paymentModel = require('./models/Payment');
const accessModel = require('./models/Access');
const noticeModel = require('./models/Notice');

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

// Definimos las relaciones
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Access, { foreignKey: 'userId' });
Access.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notice, { foreignKey: 'userId' });
Notice.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Staff,
  Payment,
  Access,
  Notice,
  conn: sequelize // para importar la conexión { conn } = require('./db.js');
};