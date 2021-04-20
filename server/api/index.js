const router = require('express').Router();
const Games = require('../db/models/games');


router.use('/today', require('./today'));

router.post('/new-game', async (req, res, next) => {
    try {
    const newGame = await Games.create(req.body);
    res.status(201).send(newGame);
    } catch (error) {
        next(error);
    }
})

router.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

module.exports = router;