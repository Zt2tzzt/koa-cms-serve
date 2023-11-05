const departmentService = require('../service/department.service')
const { ROW_IS_REFERENCED } = require('../config/error')

class MenuController {
  /**
   * @description: 此函数用于：创建部门
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async create(ctx) {
    // 1.获取到角色的对象信息
    const departmentInfo = ctx.request.body

    // 2.将数据插入到数据库中。
    const result = await departmentService.create(departmentInfo)

    // 3.返回结果
    ctx.body = {
      code: 0,
      msg: '创建部门成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：删除部门
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async remove(ctx) {
    const { departmentId } = ctx.params;

    try {
      const data = await departmentService.remove(departmentId)
      ctx.body = {
        code: 0,
        msg: '删除部门成功~',
        data
      }
    } catch (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') return ctx.app.emit('error', ROW_IS_REFERENCED, ctx)
    }
  }

  /**
   * @description: 此函数用于：更新部门信息
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async update(ctx) {
    const { departmentId } = ctx.params
    const departmentInfo = ctx.request.body

    const data = await departmentService.update(departmentId, departmentInfo)

    ctx.body = {
      code: 0,
      msg: '修改部门成功~',
      data
    }
  }

  /**
   * @description: 此函数用于：获取完整部门列表
   * @Author: ZeT1an
   * @param {*} ctx koa ctx
   * @return {*}
   */
  async list(ctx) {
    const params = ctx.request.body

    const paramsLen = Object.keys(params).length

    const result = paramsLen
      ? await departmentService.findDepartmentListByParams(params)
      : await departmentService.wholeDepartmentList()

    ctx.body = {
      code: 0,
      msg: paramsLen ? '获取部门成功~' : '获取完整部门成功~',
      data: {
        list: result,
        totalCount: result.length
      }
    }
  }
}

module.exports = new MenuController()
