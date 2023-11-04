const { NAME_IS_REQUIRED } = require('../../config/error')

/**
 * @description: 此函数用于：验证请求体中的 name 字段必填
 * @Author: ZeT1an
 * @param {string} name name 字段
 * @param {string} errPartName 名称
 * @return {boolean} 是否通过
 */
const verifyNameRequired = (name, errPartName) => {
  if (!name) {
    ctx.errPartName = errPartName
    ctx.app.emit('error', NAME_IS_REQUIRED, ctx)
    return false
  }
  return true
}

module.exports = verifyNameRequired
