const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXIST,
  NAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  INVALID_AUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
  NAME_IS_REQUIRED,
  ROW_IS_REFERENCED
} = require('../config/error')

app.on('error', (err, ctx) => {
  console.log('发生错误了~ err:', err)

  let code, msg

  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或密码不能为空~'
      break
    case NAME_IS_REQUIRED:
      code = -1002
      msg = `${ctx.errPartName}不能为空~`
      break
    case NAME_IS_ALREADY_EXIST:
      code = -1003
      msg = `${ctx.errPartName}已经被占用，请输入新的用户名~`
      break
    case NAME_IS_NOT_EXIST:
      code = -1004
      msg = '用户名不存在，请检查用户名~'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1005
      msg = '输入的密码错误，请检查密码~'
      break
    case UNAUTHORIZATION:
      code = -1006
      msg = '未授权的请求，请重新登录~'
      break
    case INVALID_AUTHORIZATION:
      code = -1007
      msg = '令牌过期，请重新登录~'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001,
      msg = '没有操作该资源的权限，或该资源已不存在~'
      break
    case ROW_IS_REFERENCED:
      code = -2002,
      msg = '该资源已被引用，无法删除~'
      break
    default:
      code = -1
      msg = '未知的错误~'
      break
  }

  ctx.body = { code, msg }
})
