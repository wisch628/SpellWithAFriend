const User = require('../db/models/users');

const requireToken = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (user.id !== Number(req.params.userId)) {
      return res.status(403).send(`You aren't authorized to play this game`);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  verifyUser,
  requireToken
};
