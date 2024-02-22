const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://0w6f0bfc-8080.euw.devtunnels.ms",
      changeOrigin: true,
    })
  );
};
