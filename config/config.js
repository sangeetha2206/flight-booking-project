const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  PORT
} = process.env;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
