const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect('mongodb+srv://Jimmy:Aryan123@cluster0.a06hdym.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
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
  
          console.log("added 'admin' to roles collection");
      }
    }).catch((err) => console.log(err));
  }