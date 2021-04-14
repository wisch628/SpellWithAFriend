const router = require('express').Router();

router.use('/sample', require('./sample'));

router.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

module.exports = router;