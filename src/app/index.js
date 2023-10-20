const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

// 创建 Koa 服务器
const app = new Koa()

app.use(bodyParser())

// 注册路由
registerRouters(app)

// 将 app 导出
module.exports = app
