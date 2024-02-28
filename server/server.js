require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const server = require("http").Server(app);
const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config.js");

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
});

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const cookieSessionConfig = cookieSession({
  name: "session",
  keys: [process.env.COOKIE_KEY],
  httpOnly: true
})

app.use(cookieSessionConfig);

const db = require("./app/models");
const { publicDecrypt } = require("crypto");
const Role = db.role;
const Quiz = db.quiz;

db.mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Login Test" });
});

//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app); 

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

io.engine.use(cookieSessionConfig);

var userIDs = []

io.use((socket, next) => {
  let token = socket.request.session.token;
  if (!token) {token = null}
  
  jwt.verify(token, config.secret, (err, decoded) => {
              if (err) {
                token = null
                socket.userID = null;
              } else {
                socket.userID = decoded.id;
              }
            });
/* 
  if quiz.visibility = 'private' {
    if !(db.quiz.owner === socket.userID) {next(new Error("Not quiz owner"))}
    next()
  } */
  next()
})

io.on("connection", (socket) => {
  socket.emit("request_data", "")
  console.log("User connected: ", socket.userID)
  io.emit("count_players", io.engine.clientsCount)

  socket.on("send_data" ((data) => {
  // check for host, if not host check for valid host, if false then return error
  // search for quiz in db, if not found return error, if found check for visibility (public/private)
  // if public proceed, if private check if quiz owner is socket id, if false return error

  //if !(socket.request.header.host) {if !(db.room.host) {next(new Error("No valid host"))}}
  if (data.host) {
    console.log("QuizID: ", data.quizID)
    console.log("GameID: ", data.gameID)
  }
  }))

  socket.on("disconnect", () => {
    io.emit("count_players", io.engine.clientsCount)
    console.log("User disconnected: ", socket.userID)
  });
});

function initial() {
    Role.estimatedDocumentCount().then((count) => {
      if (count === 0) {
        new Role({
          name: "user"
        }).save().catch((err) => {
          console.log(err);
        })
  
        new Role({
          name: "moderator"
        }).save().catch((err) => {
          console.log(err);
        })
  
        new Role({
          name: "admin"
        }).save().catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) => console.log(err));
  }
