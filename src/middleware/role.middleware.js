const roleService = require('../service/role.service')
const verifyNameRequired = require('./handle-error/verifyNameRequired')
const verifyNameAlreadyExist = require('./handle-error/verifyNameAlreadyExist')

/**
 * @description: 此中间件用于：验证客户端传递过来的 role 是否可以保存到数据库中
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyRole = async (ctx, next) => {
  // 1.验证用户名和密码，是否为空
  const { name } = ctx.request.body
  if (!verifyNameRequired(name, '角色名')) return

  // 2.判断 name，是否在数据库中已经存在
  const roles = await roleService.findRoleByName(name)
  if (!verifyNameAlreadyExist(ctx, roles, '角色名')) return

  // 3.执行下一个中间件
  await next()
}

/**
 * @description: 此中间件用于：验证客户端传递过来的 role 名称，是否在数据库中已存在
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyRoleinUpdate = async (ctx, next) => {
  // 1.验证角色名和密码，是否为空
  const { roleId } = ctx.params
  const { name } = ctx.request.body
  if (!verifyNameRequired(name, '角色名')) return

  // 2.判断 name，在数据库中是否已经存在别的角色有相同的 name
  const roles = await roleService.findRoleWithDiffName(roleId, name)
  if (!verifyNameAlreadyExist(ctx, roles, '角色名')) return

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyRole,
  verifyRoleinUpdate
}
