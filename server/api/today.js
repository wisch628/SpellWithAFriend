const router = require('express').Router()
const puppeteer = require('puppeteer');
const Words = require('../db/models/words');
const Games = require('../db/models/games');
const User = require('../db/models/users');

// router.get('/:id', async (req, res, next) => {
//     try {
//     const singleSample = await Sample.findOne({
//         where: {id: req.params.id}
//         });
//     if (singleSample) {
//         res.send(singleSample);
//     } else {
//         res.sendStatus(404);
//     }} catch (error) {
//         next(error);
//     }
// })

router.get('/correct/:id', async (req, res, next) => {
    try {
    const correctWords = await Words.findAll({
        where: {
            gameId: req.params.id
    }});
    res.send(correctWords);
   } catch (error) {
        next(error);
    }
})
// {
//     include: {
//         model: User
//     }}

router.post('/add', async (req, res, next) => {
    try {
    const newWord = await Words.create({word: req.body.word});
    console.log(newWord);
    const game = await Games.findByPk(req.body.gameId)
    await game.addWord(newWord);
    res.status(201).send(newWord);
    } catch (error) {
        next(error);
    }
})

// router.delete('/:id', async (req, res, next) => {
//     try {
//     const sample = await Sample.findByPk(req.params.id);
//     await sample.destroy();
//     res.send(sample);
//     } catch (error) {
//         next(error);
//     }
// })

// router.put('/:id', async (req, res, next) => {
//     try {
//     const sample = await Sample.findOne({
//         where: {id: req.params.id}
//         });
//     res.send(await sample.update(req.body));
//     } catch (error) {
//         next(error);
//     }
// })

router.get('/', async (req, res, next) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url = 'https://www.nytimes.com/puzzles/spelling-bee'
        await page.goto(url);
        const dataToday = JSON.parse(await page.evaluate(
            () => JSON.stringify(window.gameData.today)
          ));
        await browser.close();
        res.send(dataToday);
    } catch (error) {
        next(error)
    }
});

module.exports = router;