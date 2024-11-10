const mongoose = require("mongoose");

const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    created: {type: Date, default: Date.now},
    expireAt: {type: Date, default: null},
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
    stateData: {
      state: {type: Number, default: 0},
      currentQuestion: {type: Number, default: 0},
    },
  })
);

module.exports = Game;