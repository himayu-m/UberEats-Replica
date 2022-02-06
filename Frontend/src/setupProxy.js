// const ROOT_URL = "http://18.218.157.43:5000";
const ROOT_URL = "http://localhost:5000";

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  // console.log("prod"+process.env.PROD)
  app.use(
    createProxyMiddleware('/api/', {
      target: ROOT_URL,
    })
  );
};