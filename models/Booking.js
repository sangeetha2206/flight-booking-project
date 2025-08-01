const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  name: DataTypes.STRING,
  from: DataTypes.STRING,
  destination: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
});

module.exports = Booking;
