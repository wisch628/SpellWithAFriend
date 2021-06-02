const router = require("express").Router();
const puppeteer = require("puppeteer");
const Words = require("../db/models/words");
const Games = require("../db/models/games");
const User = require("../db/models/users");

router.get("/correct/:id", async (req, res, next) => {
  try {
    const correctWords = await Words.findAll({
      where: {
        gameId: req.params.id,
      },
    });
    res.send(correctWords);
  } catch (error) {
    next(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const currentWords = await Words.findAll({
      where: {
        gameId: req.body.gameId,
      },
      attributes: ["word"],
    });
    const currentWordsArray = currentWords.map((word) => word.dataValues.word);
    const newWord = req.body.word;
    let string =
      req.body.data.centerLetter + req.body.data.outerLetters.join("");
    let regex = new RegExp(`^[${string}]*$`);
    const toast = { type: "error", message: "" };
    if (newWord.length <= 3) {
      toast.message = "Too Short!";
      res.send({ toast });
    } else if (regex.test(newWord) === false) {
      toast.message = "Bad Letters!";
      res.send({ toast });
    } else if (newWord.includes(req.body.data.centerLetter) === false) {
      toast.message = "Missing center letter!";
      res.send({ toast });
    } else if (req.body.data.answers.indexOf(newWord) === -1) {
      toast.message = "Not in word list!!";
      res.send({ toast });
    } else if (currentWordsArray.includes(newWord)) {
      toast.message = "You already got that word!";
      res.send({ toast });
    } else {
        toast.type = "warning";
      if (req.body.data.pangrams.includes(newWord)) {
        toast.message = "Panagram!";
      } else {
        toast.message = ""; 
      }
      let newWordBody = {
        userId: req.body.userId,
        gameId: req.body.gameId,
        word: req.body.word,
        score: 0,
      };
      if (newWord.length === 4) {
        newWordBody.score = 1;
      } else {
        newWordBody.score = newWord.length;
        if (req.body.data.pangrams.includes(newWord)) {
          newWordBody.score += 7;
        }
      }
      const newWordAdded = await Words.create(newWordBody);
      const game = await Games.findByPk(req.body.gameId);
      await game.addWord(newWordAdded);
      res.status(201).send({ word: newWordBody || {}, toast });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'],
      ignoreDefaultArgs: ['--disable-extensions']
    });
    const page = await browser.newPage();
    // await page.setCacheEnabled(false);
    const url = "https://www.nytimes.com/puzzles/spelling-bee";
    await page.goto(url);
    // await page.waitForSelector(".pz-game-title");
    const dataToday = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.gameData.today))
    );
    browser.close();
    if (dataToday) {
      res.send(dataToday);
    } else {
      throw Error("NYTimes data could not be loaded");
    }
    
  } catch (error) {
    error.message="NYTimes data could not be loaded"
    next(error);
  }
});

module.exports = router;
