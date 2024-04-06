const app = require('express')();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const roomRoute = require('./route/index.route');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const io = require('socket.io')(server,{
  cors: ['http://localhost:4200']
});

mongoose.connect('mongodb://127.0.0.1:27017/forum-chat')
  .then(() => console.log('Connected!'));

app.use(cors());
app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.send('Hello World!');
});
app.use('/api',roomRoute);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});