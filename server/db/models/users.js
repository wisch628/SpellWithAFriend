const Sequelize = require('sequelize');
const db = require('../db');


 const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.ENUM('red', 'orange', 'green', 'blue', 'purple')
  }
});

module.exports = User;