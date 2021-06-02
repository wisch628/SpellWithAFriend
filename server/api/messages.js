const router = require('express').Router();
const Messages = require('../db/models/messages');
const User = require('../db/models/users');

module.exports = router;

// GET /api/messages
router.get('/:gameId', async (req, res, next) => {
  try {
    const messages = await Messages.findAll({
        where: {
            gameId: req.params.gameId
        },
        include: {
            model: User
        }
    });
    res.send(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/:gameId', async (req, res, next) => {
  try {
    const user = await User.findByPk(Number(req.body.userId));
    const message = await Messages.create({content: req.body.message, gameId: Number(req.params.gameId), userId: Number(req.body.userId)});
    await user.addMessage(message);
    const toSend = await Messages.findOne({
      where: {
        id: message.id},
      include: {
        model: User
      }
    });
    res.json(toSend);
  } catch (err) {
    next(err);
  }
});

// // PUT /api/messages
// router.put('/:messageId', async (req, res, next) => {
//   try {
//     const messageId = req.params.messageId;
//     const message = await Message.findByPk(messageId)
//     await message.update(req.body);
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// });

// // DELETE /api/messages
// router.delete('/:messageId', async (req, res, next) => {
//   try {
//     const id = req.params.messageId;
//     await Message.destroy({ where: { id } })
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// });