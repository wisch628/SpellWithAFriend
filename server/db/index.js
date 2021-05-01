const db = require('./db')
const UserInfo = require('./models/users');
const Words = require('./models/words');
const Games = require('./models/games');
const UserGameAs = require('./models/user-game-as');
const Messages = require('./models/messages');
//REQUIRE MODELS HERE

//DEFINE ASSOCIATIONS HERE

//One to One
    //A.hasOne(B);
    //A.belongTo(B);
//One to Many
    UserInfo.hasMany(Words);
    Words.belongsTo(UserInfo);
    Games.hasMany(Words);
    Words.belongsTo(Games);
    UserInfo.hasMany(Messages);
    Messages.belongsTo(UserInfo);
    Games.hasMany(Messages);
    Messages.belongsTo(Games);
    Games.belongsToMany(UserInfo, {through: UserGameAs});
    UserInfo.belongsToMany(Games, {through: UserGameAs});
//Many to Many
    //A.belongsToMany(B, {through: 'C'}) belongs to many through a junction tables


module.exports = {
    db,
    models: {
        UserInfo, 
        Words,
        Games,
        UserGameAs,
        Messages
        //INSERT MODELS HERE
    },
  }