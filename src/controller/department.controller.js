const departmentService = require('../service/department.service')

class MenuController {
  /**
   * @description: 此函数用于：创建部门
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
    async create(ctx) {
      // 1.获取到角色的对象信息
      const department = ctx.request.body

      // 2.将数据插入到数据库中。
      const result = await departmentService.create(department)

      // 3.返回结果
      ctx.body = {
        code: 0,
        msg: '创建部门成功~',
        data: result
      }
    }

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
