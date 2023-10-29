const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: String,
    answers: Array,
    alternatives: Array
  })
);

module.exports = Question;