const Sequelize = require('sequelize');

//CHANGE THIS LINK TO YOUR DB NAME
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/SampleDB', {
  logging: false
});

module.exports = db;