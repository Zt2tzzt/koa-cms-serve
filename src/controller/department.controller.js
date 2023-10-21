const departmentService = require('../service/department.service')

class MenuController {
  /**
   * @description: 此函数用于：获取完整部门列表
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async list(ctx) {
    const result = await departmentService.wholeDepartmen()

    ctx.body = {
      code: 0,
      msg: '获取完整部门成功~',
      data: {
        list: result,
        totalCount: result.length
      }
    }
  }
}

module.exports = new MenuController()
