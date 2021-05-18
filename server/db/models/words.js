const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./users');
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const axios = require('axios');

// const SALT_ROUNDS = 5;

const Words = db.define('words', {
  word: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER
  }
})


module.exports = Words

//add any hooks, class methods, or instance methods below
