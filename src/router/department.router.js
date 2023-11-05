const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, update, remove } = require('../controller/department.controller')
const {
  verifyDepartment,
  verifyDepartmentinUpdate
} = require('../middleware/department.middleware')

const departmentRouter = new KoaRouter({ prefix: '/department' })

// 增，新增部门
departmentRouter.post('/', verifyAuth, verifyDepartment, create)

// 删，删除部门
departmentRouter.delete('/:departmentId', verifyAuth, remove)

// 改，修改部门
departmentRouter.patch('/:departmentId', verifyAuth, verifyDepartmentinUpdate, update)

// 查，查询部门列表
departmentRouter.post('/list', verifyAuth, list)

module.exports = departmentRouter
