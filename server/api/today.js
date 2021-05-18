const router = require('express').Router()
const puppeteer = require('puppeteer');
const Words = require('../db/models/words');
const Games = require('../db/models/games');
const User = require('../db/models/users');

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

router.post('/add', async (req, res, next) => {
    try {
        console.log(req.body);
    if (req.body.data.answers.includes(req.body.word)) {
        let newWordBody = {
            userId: req.body.userId,
            gameId: req.body.gameId,
            word: req.body.word,
            score: 0
        }
        if (req.body.word.length === 4) {
            newWordBody.score = 1;
        } else {
            newWordBody.score = req.body.word.length;
            if (req.body.data.pangrams.includes(req.body.word)) {
                newWordBody.score+=7
            }
        }
        const newWord = await Words.create(newWordBody);
        const game = await Games.findByPk(req.body.gameId)
        await game.addWord(newWord);
        res.status(201).send(newWord);
    } else {
        throw new Error('that word is not in the list');
    }
    
    } catch (error) {
        next(error);
    }
})


router.get('/', async (req, res, next) => {
    try {
        const browser = await puppeteer.launch({
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
            ],
          });
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