const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const SALT_ROUNDS = 10;

 const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
  }
});

module.exports = User;

/**
 * instanceMethods
 */
 User.prototype.correctPassword = async function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  let hashPassword = await this.password;

  return bcrypt.compareSync(candidatePwd, hashPassword);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
  const user = await this.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect email/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
  }
};

const capName =  name =>  {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
}

User.beforeCreate( (user) => {
  user.firstName = capName(user.firstName)
  user.lastName = capName(user.lastName)
});

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => {
  users.forEach(hashPassword);
});