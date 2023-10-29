const mongoose = require("mongoose");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    title: String,
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    questions: [
      {
        question: String,
        right_answers: Array,
        answers: Array
      }
    ]
  }, {collection: 'quiz'})
);

module.exports = Quiz;