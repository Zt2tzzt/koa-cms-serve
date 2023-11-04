const { NAME_IS_ALREADY_EXIST } = require('../../config/error')

const verifyNameAlreadyExist = (ctx, resList, errPartName) => {
  if (resList.length) {
    ctx.errPartName = errPartName
    ctx.app.emit('error', NAME_IS_ALREADY_EXIST, ctx)
    return false
  }
  return true
}

module.exports = verifyNameAlreadyExist
