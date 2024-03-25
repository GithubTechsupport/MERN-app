require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const server = require("http").Server(app);
const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config.js");
const ShortUniqueID = require('short-unique-id');

const io = require('socket.io')(server, {
  cors: {
    origin: 'https://7jp85kmx-3000.euw.devtunnels.ms',
    credentials: true
  },
  pingTimeout: 1000,
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
  httpOnly: true,
  path: '/'
})

app.use(cookieSessionConfig);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

const db = require("./app/models");
var ObjectId = require('mongodb').ObjectId;
const { publicDecrypt } = require("crypto");
const Role = db.role;
const Quiz = db.quiz;
const Game = db.game;

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
const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

io.engine.use(cookieSessionConfig);

var userIDs = []

io.engine.on("connection_error", (err) => {
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

io.use((socket, next) => {
  if (socket.handshake.query.notSignedin) {
    socket.userID = null;
    return next();
  }

  let token = socket.request.session.token;
  if (!token) {
    socket.userID = null;
    return next();
  }
  jwt.verify(token, config.secret, (err, decoded) => {
              if (err) {
                return next(new Error("Invalid Access Token!"));
              }
              socket.userID = decoded.id; 
            })

/* 
  if quiz.visibility = 'private' {
    if !(db.quiz.owner === socket.userID) {next(new Error("Not quiz owner"))}
    next()
  } */
  return next()
})

io.on("connection", (socket) => {
  socket.emit("request_data")
socket.on("send_data", async (data) => {
    socket.role = data.role;
    if (data.sessionData) {socket.sessionID = data.sessionData.sessionID}
    console.log({...data, sessionID: socket.sessionID, userID: socket.userID});
    console.log(socket.handshake.address);
  // check if game is active, if active check if user in game, if yes retrieve info
  // check for host, if not host check for valid host, if false then return error, if true save data to db
  // search for quiz in db, if not found return error, if found check for visibility (public/private)
  // if private check if quiz owner is socket id, if false return error
  // save data to database

  
    switch (socket.role) {
      case 'player':
        socket.gameID = data.gameID;
        if (socket.sessionID) {
          Game.findOne({gameID: socket.gameID}).populate("players").exec().then((game) => {
            for (const p of game.players) {
              if (p.sessionID === socket.sessionID) {
                socket.join(socket.gameID);
                io.to(socket.gameID).emit("count_players", io.sockets.adapter.rooms.get(socket.gameID).size);
                console.log("User reconnected: ", socket.sessionID);
                return;
              }
            }
            socket.emit("exception", { message: "Could not find session" });
            socket.disconnect();
          })
          return;
        }
        if (!socket.gameID) {
        socket.emit("exception", { message: "Invalid GameID" });
          socket.disconnect();
          return;
        }
      Game.findOne({gameID: socket.gameID}).exec().then((game) => {
          if (!game) {
            socket.emit("exception", { message: "Invalid GameID" });
            socket.disconnect();
            return;
          }
        socket.sessionID = socket.id;
          game.players.push({sessionID: socket.sessionID})
          game.save().then((game) => {
            socket.join(socket.gameID);
            socket.emit("store_session_data", { sessionID: socket.sessionID, gameID: socket.gameID });
            io.to(socket.gameID).emit("count_players", io.sockets.adapter.rooms.get(socket.gameID).size);
            console.log("User connected: ", socket.sessionID);
          })
        })
        break
      case 'host':
        if (socket.sessionID) {
          socket.gameID = data.sessionData.gameID; 
          Game.findOne({host: socket.gameID}).exec().then((game) => {
            if (!game) {
              socket.emit("exception", { message: "Game Not Found" });
              socket.disconnect();
              return;
            }
            if (game.host !== socket.userID) {
              socket.emit("exception", { message: "Invalid Host" });
              socket.disconnect();
              return;
            }
            socket.join(socket.gameID);
            io.to(socket.gameID).emit("count_players", io.sockets.adapter.rooms.get(socket.gameID).size);
            console.log("User reconnected: ", socket.sessionID);
            return; //Return host to preexisting game
          }).catch((err) => {socket.emit("exception", {message: err}); socket.disconnect(); return;})
          return;
        }
        socket.gameID = new ShortUniqueID().rnd();
        socket.sessionID = socket.id;
        socket.join(socket.gameID);
        const newGame = new Game({
          quiz: new ObjectId(data.quizID),
          host: socket.userID,
          gameID: socket.gameID,
        })
        newGame.save().then((game) => {
          io.to(socket.gameID).emit("count_players", io.sockets.adapter.rooms.get(socket.gameID).size);
          socket.emit("store_session_data", { sessionID: socket.id, gameID: socket.gameID });
          socket.emit("send_gameid", socket.gameID);
          console.log("User connected: ", socket.sessionID);
        })
        break;
        
      default:
        socket.emit("exception", { message: "Invalid Role" });
        socket.disconnect();
        return;
    }
  })

  socket.on("disconnect", (cause) => {
    if (io.sockets.adapter.rooms.get(socket.gameID)) {
      io.emit("count_players", io.sockets.adapter.rooms.get(socket.gameID).size)
    }
    console.log("User disconnected: ", socket.sessionID)
    console.log("Reason: ", cause)
    switch (socket.role) {
      case 'host': //Add an expiration timer to document in MongoDB
        Game.findOne({ host: socket.userID }).exec().then((game) => {
          if (!game) {return}
          
        })
        break
      case 'player': //Add expiration timer to sessiondata stored in localhost 
        break
    }
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
