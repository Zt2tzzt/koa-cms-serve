const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list } = require('../controller/department.controller')
const { verifyDepartment } = require('../middleware/department.middleware')

const departmentRouter = new KoaRouter({ prefix: '/department'})

// 增，新增部门
departmentRouter.post('/', verifyAuth, verifyDepartment, create)

// 查，查询部门列表
departmentRouter.post('/list', verifyAuth, list)

module.exports = departmentRouter