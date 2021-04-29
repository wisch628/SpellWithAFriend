const router = require('express').Router();


router.use('/today', require('./today'))
router.use('/user', require('./user'))
router.use('/game', require('./game'))

router.use(function (req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

module.exports = router;