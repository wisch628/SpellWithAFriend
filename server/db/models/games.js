const Sequelize = require('sequelize')
const db = require('../db')

const Games = db.define('games', {
    code: {
        type: Sequelize.STRING
    },
    expiration: {
      type: Sequelize.DATE
    }
  })
  

  Games.beforeCreate( (game) => {
    const generateRandomString = function(length=6){
        return Math.random().toString(20).substr(2, length)
        };
    const code = generateRandomString();
    let date = new Date();
    if (date.getHours() >= 3) {
      date.setDate(new Date().getDate()+1);
    }
    date.setHours(3, 0, 0, 0)
    game.expiration = date;
    game.code = code;
  });
  
  
  module.exports = Games
  