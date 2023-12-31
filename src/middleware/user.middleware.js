const {
  NAME_OR_PASSWORD_IS_REQUIRED
} = require('../config/error')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-password')
const verifyNameRequired = require('./handle-error/verifyNameRequired')
const verifyNameAlreadyExist = require('./handle-error/verifyNameAlreadyExist')

/**
 * @description: 此中间件用于：验证客户端传递过来的 user 是否可以保存到数据库中
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyUser = async (ctx, next) => {
  // 1.验证用户名和密码，是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.判断 name，是否在数据库中已经存在
  const users = await userService.findUserByName(name)
  if (!verifyNameAlreadyExist(ctx, users, '用户名')) return

  // 3.执行下一个中间件
  await next()
}

const verifyUserinUpdate = async (ctx, next) => {
  // 1.验证用户名和密码，是否为空
  const { userId } = ctx.params
  const { name } = ctx.request.body
  if (!verifyNameRequired(name, '用户名')) return

  // 2.判断 name，在数据库中是否已经存在别的用户有相同的 name
  const users = await userService.findUserWithDiffName(userId, name)
  if (!verifyNameAlreadyExist(ctx, users, '用户名')) return

  // 3.执行下一个中间件
  await next()
}

/**
 * @description: 此中间件用于：对用户的密码，进行 MD5 加密
 * @Author: ZeT1an
 * @param {*} ctx koa
 * @param {*} next koa next
 * @return {*}
 */
const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body

  // 2.对密码进行加密
  ctx.request.body.password = md5password(password)

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
  verifyUserinUpdate
}
