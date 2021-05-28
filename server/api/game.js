const router = require('express').Router();
const Games = require('../db/models/games');
const User = require('../db/models/users');
const UserGame = require('../db/models/user-game-as');
const { Op } = require('sequelize');

router.get('/allgames/:userId', async (req, res, next) => {
    try {
        const date = new Date();
        const games = await User.findOne({
            where: {
                id: req.params.userId
            },
            include: {
                model: Games, 
                where: {
                    expiration: {
                        [Op.gte] : date
                    }
                },
                include: {
                    model: User
                }
            }});
        console.log(games);
        res.send(games);
    } catch (error) {
        next(error);
    }
})

router.post('/join/:gameCode', async (req, res, next) => {
    try {
    const game = await Games.findOne({
        where: {
            code: req.params.gameCode
        }
    });
    if (game.expiration <= new Date ()){
        const err = new Error('That game has expired! Try creating a new game instead');
        err.status = 400;
        next(err);
    } else {
        const user = await User.findByPk(req.body.userId);
        await game.addUser(user);
        const gameAndUser = await UserGame.findOne({
            where:{
                gameId: game.id,
                userId: user.id
            }})
        gameAndUser.setColor(req.body.color);
        res.status(201).send(game);
    }
    } catch (error) {
        next(error);
    }
})

router.get('/:gameId/:userId', async (req, res, next) => {
    try {
        let game;
        if (Number(req.params.gameId)){
            game = await Games.findOne({
                where: {
                    id: req.params.gameId},
                include: {
                    model: User
                    }
                }
                );
        } else {
            game = await Games.findOne({
                where: {
                    code: req.params.gameId
            },
            include: {
                model: User
                }
        })
        }
        const gameUsers = game.users.filter(user => user.id == req.params.userId);
        //
        console.log("game users", gameUsers)
        if (gameUsers.length === 0) {
            const err = new Error(`Sorry, you don't have access to this game`);
            err.status = 400;
            next(err);
        } else if (game.expiration <= new Date ()){
            const err = new Error('That game has expired! Try creating a new game instead');
            err.status = 400;
            next(err);
        } else {
            res.send(game);
        }

    } catch (error) {
        next(error);
    }
})

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