const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { list } = require('../controller/department.controller')

const departmentRouter = new KoaRouter({ prefix: '/department'})

departmentRouter.post('/list', verifyAuth, list)

module.exports = departmentRouter