const app = require('./app')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')

// 开启 Koa 服务器
app.listen(SERVER_PORT, () => {
  console.log('ltp-bi-serve 服务器启动成功~，端口好:', SERVER_PORT)
})
