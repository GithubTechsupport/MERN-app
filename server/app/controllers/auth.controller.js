const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { jwtDecode } = require('jwt-decode');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    quizes: [],
  });

  user.save().then((user) => {
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        }).then((roles) => {
          user.roles = roles.map((role) => role._id);
          user.save().catch((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          })
        }).catch((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })
    } else {
      Role.findOne({ name: "user" }).then((role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          res.send({ message: "User was registered successfully!" });
        });
      }).catch((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    }
  }).catch((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .populate("quizes")
    .exec().then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 21600, // 24 hours
                              });

      const refreshToken = jwt.sign({ id: user.id },
                              config.refresh_secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 7776000, // 90 days
                              });

      var authorities = [];
      var quizes = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      for (let i = 0; i < user.quizes.length; i++) {
        quizes.push(user.quizes[i]);
      }
      req.session.token = token;
      req.session.refreshToken = refreshToken;
      res.cookie('token', 'hello', {domain: 'localhost', httpOnly: true, secure: true, maxAge: 100000, sameSite: 'None'})
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        quizes: quizes
      });
    }).catch((err) => {
      if (err) {
        console.log(err)
        res.status(500).send({ message: err });
        return;
      }
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    return res.status(520).send({ message: err });
  }
};

exports.refreshToken = async (req, res) => {
  //check for access token
  if (!req.session.token) {return res.status(404).send({ message: "No access token provided!" })}

  //check if access token is expired
  const decodedToken = jwtDecode(req.session.token);
  const currentDate = new Date();
  if (decodedToken.exp * 1000 > currentDate.getTime()) {
    return res.status(200).send({ message: "Token not expired" })
  }

  //take refresh token from user
  const refreshToken = req.session.refreshToken;
  
  //check for refresh token
  if (!refreshToken) {return res.status(404).send({ message: "No refresh token provided!" })}

  //if all ok, create new access token, refresh token, and send to user
  jwt.verify(refreshToken,
    config.refresh_secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.session.token = null
      const token = jwt.sign({ id: decoded.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 21600, // 24 hours
        });

      req.session.token = token;
      res.status(200).send({ message: "Token refreshed" })
    });
}