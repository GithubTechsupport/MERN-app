const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/test/createQuiz", [authJwt.verifyToken], controller.createQuiz);

  app.post("/api/test/updateQuiz", [authJwt.verifyToken], controller.updateQuiz);

  app.post("/api/test/deleteQuiz", [authJwt.verifyToken], controller.deleteQuiz);

  app.get("/api/test/getQuiz", [authJwt.verifyToken], controller.getQuiz);

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

};