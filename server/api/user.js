const router = require('express').Router();
const User = require('../db/models/users');
const Games = require('../db/models/games');
const UserGame = require('../db/models/user-game-as');

router.post('/', async (req, res, next) => {
    try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
})

router.get('/:email', async (req, res, next) => {
    try {
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    });
    res.status(201).send(user);
    } catch (error) {
        next(error);
    }
})

router.get('/:userId/:gameId', async (req, res, next) => {
    try {
    const game = await Games.findByPk(req.params.gameId);
    const user = await User.findByPk(req.params.userId);
    const gameAndUser = await UserGame.findOne({
        where:{
            gameId: game.id,
            userId: user.id
        }})
    res.send(gameAndUser);
    } catch (error) {
        next(error);
    }
})

module.exports = router;