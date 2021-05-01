const Sequelize = require('sequelize')
const db = require('../db')

const Messages = db.define('messages', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})


module.exports = Messages
