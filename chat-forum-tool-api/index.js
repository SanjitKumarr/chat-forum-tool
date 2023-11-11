const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: ['http://localhost:4200']
});
const port = process.env.PORT || 3000;
app.get('/', function(req, res) {
  res.send('Hello World!');
});
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