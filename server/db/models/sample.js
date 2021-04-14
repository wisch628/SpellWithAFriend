const Sequelize = require('sequelize')
const db = require('../db')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
// const axios = require('axios');

// const SALT_ROUNDS = 5;

const Sample = db.define('sample', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  }
})

module.exports = Sample

//add any hooks, class methods, or instance methods below