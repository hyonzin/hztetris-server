// express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 30000
// cors
const cors = require('cors');
app.use(cors({
  origin: "*",
  credentials: true,
}));
// socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('hello');
});

io.on('connection', (socket) => {
  console.log(socket.id + ' connected');
  socket.broadcast.emit('system message', `<SYSTEM> a user connected`);
  
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.broadcast.emit('system message', msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
