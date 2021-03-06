const router = require('express').Router();
const User = require('../db/models/users');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    res.send({ token: await User.authenticate(req.body), userId: user.id });
  } catch (err) {
    err.message="Wrong Email/Password";
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await User.create({ email, password, firstName, lastName });
    res.send({ token: await user.generateToken(), userId: user.id });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
      err.message="A user with that email already exists";
    } else {
      err.message="Something went wrong at signup – please try again";
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
