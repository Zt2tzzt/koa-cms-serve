const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path');

class UserController {
  /**
   * @description: 此中间件用于：用户注册
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async create(ctx) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body

    // 2.将用户信息存储到数据库中
    const result = await userService.create(user)

    // 3.返回响应结果
    ctx.body = {
      code: 0,
      msg: '创建用户成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：根据用户 id，修改用户
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async updateUserById(ctx) {
    const { userId } = ctx.params;
    const user = ctx.request.body

    const result = await userService.updateUserById(userId, user)

    ctx.body = {
      code: 0,
      msg: '修改用户成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：根据用户 id，删除用户
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async removeUserById(ctx) {
    const { userId } = ctx.params;

    const result = await userService.removeUserById(userId)

    ctx.body = {
      code: 0,
      msg: '删除用户成功~',
      data: result
    }
  }

   /**
   * @description: 此函数用于：获取用户详细信息
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
   async detail(ctx) {
    const { userId } = ctx.params;

    const [userInfo] = await userService.findUserDetailById(userId)

    ctx.body = {
      code: 0,
      data: userInfo
    }
  }

  /**
   * @description: 此函数用于：获取用户列表
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async list(ctx) {
    const params = ctx.request.body;

    const values = await userService.findUserListByParams(params)

    ctx.body = {
      code: 0,
      data: {
        list: values,
        totalCount: values.length
      }
    }
  }

  /**
   * @description: 此函数用于：根据用户 id，返回用户头像
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async showAvatarImage(ctx) {
    // 1.获取用户 id
    const { userId } = ctx.params;
    // 2.根据用户 id，获取用户头像信息
    const avatarInfo = await fileService.queryAvatarByUserId(userId)

    // 3.返回头像文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)

  }

}

module.exports = new UserController()
