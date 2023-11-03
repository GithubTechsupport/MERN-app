const db = require("../models");
const Quiz = db.quiz;
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("HELLO USER");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.createQuiz = (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    questions: req.body.questions,
  })

  quiz.save().then((quiz) => {
    User.findById(req.userId).exec().then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.quizes.push(quiz._id);
      user.save().then((user) => {
        res.send({ message: "Quiz created successfully!" })
      }).catch((err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
      })
    }).catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return
      }
    })
  }).catch((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })
}

exports.getQuiz = (req, res) => {
  User.findById(req.userId).exec().then((user) => {
    if (!user) {
      return res.status(404).send(( {message: 'User not found' }))
    }
    
  })
}