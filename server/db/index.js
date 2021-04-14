const db = require('./db')
const sample = require('./models/sample');
//REQUIRE MODELS HERE

//DEFINE ASSOCIATIONS HERE

//One to One
    //A.hasOne(B);
    //A.belongTo(B);
//One to Many
    //A.hasMany(B); FK is on B
//Many to Many
    //A.belongsToMany(B, {through: 'C'}) belongs to many through a junction tables


module.exports = {
    db,
    models: {
        sample
        //INSERT MODELS HERE
    },
  }