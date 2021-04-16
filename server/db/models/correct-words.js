const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./users');
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const axios = require('axios');

// const SALT_ROUNDS = 5;

const CorrectWords = db.define('correct-words', {
  word: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})


module.exports = CorrectWords

//add any hooks, class methods, or instance methods below