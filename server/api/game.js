const router = require('express').Router();
const Games = require('../db/models/games');
const User = require('../db/models/users');
const UserGame = require('../db/models/user-game-as');


router.post('/', async (req, res, next) => {
    try {
    console.log(req.body);
    const newGame = await Games.create();
    const user = await User.findByPk(req.body.userId);
    await newGame.addUser(user);
    const gameAndUser = await UserGame.findOne({
        where:{
            gameId: newGame.id,
            userId: user.id
        }})
    gameAndUser.setColor(req.body.color);
    res.status(201).send(newGame);
    } catch (error) {
        next(error);
    }
})

module.exports = router;