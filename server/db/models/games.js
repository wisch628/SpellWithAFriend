const Sequelize = require('sequelize')
const db = require('../db')

const Games = db.define('games', {
    code: {
        type: Sequelize.STRING
    }
  })
  

  Games.beforeCreate( (game) => {
    const generateRandomString = function(length=6){
        return Math.random().toString(20).substr(2, length)
        };
    const code = generateRandomString();
    game.code = code;
  });
  
  
  module.exports = Games
  