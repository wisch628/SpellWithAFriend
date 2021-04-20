const Sequelize = require('sequelize')
const db = require('../db')

const UserGameAs = db.define('user-game-as', {
    color: {
        type: Sequelize.ENUM('red', 'orange', 'green', 'blue', 'purple')
      }
  })
  
  
  module.exports = UserGameAs;