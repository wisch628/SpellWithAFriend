const { db } = require('./db')
const PORT = process.env.PORT || 3000
const app = require('./app')

const init = async () => {
  try {
    await db.sync()
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    const io = require('socket.io')(server);
    require('./socket')(io);
  } catch (ex) {
    console.log(ex)
  }
}

init()

