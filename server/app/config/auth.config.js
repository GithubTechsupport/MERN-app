require("dotenv").config();

module.exports = {
    secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.REFRESH_ACCESS_TOKEN_SECRET,
  };