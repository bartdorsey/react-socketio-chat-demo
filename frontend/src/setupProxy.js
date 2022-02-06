const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  console.log('Setting up Proxy.......................................');
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  )
  app.use(
    "/socket.io", createProxyMiddleware({ target: "ws://localhost:4000/socket.io", ws: true })
  )
}
