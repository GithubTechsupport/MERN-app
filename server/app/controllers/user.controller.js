const db = require("../models");
var ObjectId = require('mongodb').ObjectId;
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

exports.updateQuiz = (req, res) => {
  User.findById(req.userId).populate("quizes").exec().then( async (user) => {
    for (let i = 0; i < user.quizes.length; i++) {
      if (user.quizes[i]._id.toString() == req.body.quizID) {
        await Quiz.updateOne({_id: new ObjectId(req.body.quizID)}, {$set: {
          title: req.body.title,
          questions: req.body.questions,
          updated: Date.now(),
        }})
        return res.send({ message: "Quiz updated successfully!" });
      }
    }
    return res.status(404).send({ message: "Quiz Not Found." })
  })
}

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
  User.findById(req.userId)
    .populate("quizes")
    .exec().then((user) => {
    if (!user) {
      return res.status(404).send(({message: 'User not found' }))
    }

    res.status(200).send({
      quizes: user.quizes
    });
  })
}

exports.deleteQuiz = (req, res) => {
  User.findById(req.userId).exec().then( async (user) => {
    for (let i = 0; i < user.quizes.length; i++) {
      if (user.quizes[i]._id.toString() == req.body.quizID) {
        await Quiz.deleteOne({_id: new ObjectId(req.body.quizID)});
        return res.send({ message: "Quiz deleted successfully!" });
      }
    }
    return res.status(404).send({ message: "Quiz Not Found." })
  })
}