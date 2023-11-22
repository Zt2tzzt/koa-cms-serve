const verifyNameRequired = require('./handle-error/verifyNameRequired')
const verifyNameAlreadyExist = require('./handle-error/verifyNameAlreadyExist')
const menuService = require('../service/menu.service')

const verfiMenu = async (ctx, next) => {
  // 1.验证菜单名称，菜单级别是否为空
  const { name, type } = ctx.request.body;
  if (!verifyNameRequired(name, '菜单名称')) return
  if (!verifyNameRequired(type, '菜单级别')) return

  // 2.判断菜单名称是否在数据库中已存在
  const menus = await menuService.findMenuByName(name)
  if (!verifyNameAlreadyExist(ctx, menus, '菜单名称')) return

  await next()
}

const uverfyMenuUpdate = async (ctx, next) => {
  // 验证菜单名，菜单级别是否为空
  const { menuId } = ctx.params;
  const { name, type } = ctx.request.body;
  if (!verifyNameRequired(name, '菜单名称')) return
  if (!verifyNameRequired(type, '菜单级别')) return

  // 2.判断 name，在数据库中是否已经存在别的菜单有相同的名称
  const menus = await menuService.findMenuWithDiffName(menuId, name)
  if (!verifyNameAlreadyExist(ctx, menus, '菜单名称')) return

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verfiMenu,
  uverfyMenuUpdate
}