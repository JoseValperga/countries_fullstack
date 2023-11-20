require("dotenv").config(); //las variables de entorno quedan disponibles en process.env
const { Sequelize } = require("sequelize");
const ActivityModel = require("./models/Activity");
const CountryModel = require("./models/Country");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
  {
    logging: false,
    native: false,
  }
);

/*
const sequelize = new Sequelize(DB_DEPLOY,
  {
    logging: false,
    native: false,
  }
);
*/
CountryModel(sequelize);
ActivityModel(sequelize);
const {Country, Activity} = sequelize.models

Country.belongsToMany(Activity, {through: 'CountryActivity'})
Activity.belongsToMany(Country, {through: 'CountryActivity'})

module.exports = {
  Country,
  Activity,
  conn: sequelize,
};


















/*module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
*/
