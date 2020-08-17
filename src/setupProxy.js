const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/*", { target: "http://45.119.83.67:3000/" }));
};