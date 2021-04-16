const db = require('./db')
const User = require('./models/users');
const CorrectWords = require('./models/correct-words');
//REQUIRE MODELS HERE

//DEFINE ASSOCIATIONS HERE

//One to One
    //A.hasOne(B);
    //A.belongTo(B);
//One to Many
    User.hasMany(CorrectWords);
//Many to Many
    //A.belongsToMany(B, {through: 'C'}) belongs to many through a junction tables


module.exports = {
    db,
    models: {
        User, 
        CorrectWords
        //INSERT MODELS HERE
    },
  }