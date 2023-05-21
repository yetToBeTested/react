const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://106.52.235.252:8101/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  )
}
