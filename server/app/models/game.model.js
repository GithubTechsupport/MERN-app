const mongoose = require("mongoose");

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    created: {type: Date, default: Date.now},
    currentQuestion: {type: Number, default: -1},
    gameID: String,
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
      },
    host: String,
    players: [
      {
        sessionID: String,
        points: {type: Number, default: 0},
      }
    ],
    finished: {type: Boolean, default: false},
  })
);

module.exports = Game;