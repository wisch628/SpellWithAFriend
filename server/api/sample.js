const router = require('express').Router()
const { models: { Sample }} = require('../db')

router.get('/:id', async (req, res, next) => {
    try {
    const singleSample = await Sample.findOne({
        where: {id: req.params.id}
        });
    if (singleSample) {
        res.send(singleSample);
    } else {
        res.sendStatus(404);
    }} catch (error) {
        next(error);
    }
})

router.post('/add', async (req, res, next) => {
    try {
    const newSample = await Sample.create(req.body);
    res.status(201).send(newSample);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
    const sample = await Sample.findByPk(req.params.id);
    await sample.destroy();
    res.send(sample);
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
    const sample = await Sample.findOne({
        where: {id: req.params.id}
        });
    res.send(await sample.update(req.body));
    } catch (error) {
        next(error);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const allSamples = await Sample.findAll();
        res.send(allSamples);
    } catch (error) {
        next(error)
    }
});

module.exports = router;