const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, update, remove } = require('../controller/menu.controller')
const { verfiMenu, uverfyMenuUpdate } = require('../middleware/menu.middleware');
const menuService = require('../service/menu.service');

const menuRouter = new KoaRouter({ prefix: '/menu' })

// 增，新增菜单
menuRouter.post('/', verifyAuth, verfiMenu, create)

// 删：根据 id，删除菜单
menuRouter.delete('/:menuId', verifyAuth, remove)

// 改，根据 id 修改菜单
menuRouter.patch('/:menuId', verifyAuth, uverfyMenuUpdate, update)

// 查，获取菜单列表
menuRouter.post('/list', verifyAuth, list)

module.exports = menuRouter
