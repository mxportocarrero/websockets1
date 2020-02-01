import dotenv from 'dotenv'
import path from 'path'
import express from 'express';
import SocketIO from 'socket.io'

dotenv.config()

const app = express();

// settings
app.set('port', process.env.PORT);

// static files
app.use(express.static(path.join(__dirname,'public')));

//start the server
const server = app.listen(app.get('port'),() => {
  console.log('server on port', app.get('port'))
})

// listening with SocketIO
const io = SocketIO(server)

// websockets
io.on('connection', socket => {
  console.log("user connected from socket:",  socket.id)

  socket.on('chat message', data => {
    console.log(data)
    io.sockets.emit('server message', data)
  })

  socket.on('chat typing', (data) => {
    socket.broadcast.emit('chat typing', data)
  })
})

