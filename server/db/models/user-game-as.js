const Sequelize = require('sequelize')
const db = require('../db')

const UserGameAs = db.define('user-game-as', {
    color: {
        type: Sequelize.ENUM('Red', 'Orange', 'Green', 'Blue', 'Purple')
      }
  })
  

  //instance methods

  UserGameAs.prototype.setColor = async function (color) {
    this.color = color;
    await this.save();
  }
  
  module.exports = UserGameAs;