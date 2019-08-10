const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {} ;

io.on('connection', socket => {
  const {user} = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

const PORT = process.env.PORT || 3333;


mongoose.connect(
  "mongodb+srv://joao:joaopedropradoleal@mycrud-5dlnm.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true }
  );
  
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next()
})
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`);
});

// M - Model, V - View, C - Controller
