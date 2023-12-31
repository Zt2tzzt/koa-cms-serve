const { PRIVATE_KEY } = require('../config/secret')
const jwt = require('jsonwebtoken')

class LoginController {
  /**
   * @description: 此中间件用于：用户登录，颁发令牌。
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @param {*} next koa next
   * @return {*}
   */
  login(ctx) {
    // 1.获取用户信息
    const { id, name } = ctx.user

    // 2.颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 一天后过期
      algorithm: 'RS256'
    })

    // 3.返回用户信息
    ctx.body = { code: 0, data: { id, name, token } }
  }

  test(ctx) {
    ctx.body = {
      code: 0,
      msg: '令牌有效~'
    }
  }
}

module.exports = new LoginController()
