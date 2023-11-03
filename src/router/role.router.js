const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const {
  create,
  remove,
  update,
  listWithMenus,
  detailWithMenus,
} = require('../controller/role.controller')
const { verifyRole, verifyRoleinUpdate } = require('../middleware/role.middleware')

const roleRouter = new KoaRouter({ prefix: '/role' })

// 增：新增角色
roleRouter.post('/', verifyAuth, verifyRole, create)

// 删：根据 id，删除角色
roleRouter.delete('/:roleId', verifyAuth, remove)

// 改，根据 id，修改角色
roleRouter.patch('/:roleId', verifyAuth, verifyRoleinUpdate, update)

// 查，查询角色列表，和对应的菜单。
roleRouter.post('/list', verifyAuth, listWithMenus)

// 查，根据 id，查询角色，和对应的菜单。
roleRouter.get('/:roleId/menu', verifyAuth, detailWithMenus)

module.exports = roleRouter
