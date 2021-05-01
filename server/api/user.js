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

router.get('/game/:gameId', async (req, res, next) => {
    try {
        let game;
        console.log(req.params.gameId);
        if (Number(req.params.gameId)){
            game = await Games.findByPk(req.params.gameId);
        } else {
            game = await Games.findOne({
                where: {
                    code: req.params.gameId
            }})
        }
    const gameUsers = await User.findAll({
    include: {
        model: Games,
        where:{
            id: game.id
        },
    }})
    res.send(gameUsers);
    } catch (error) {
        next(error);
    }
})

module.exports = router;