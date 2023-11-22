const menuService = require('../service/menu.service');
const { ROW_IS_REFERENCED } = require('../config/error')

class MenuController {
  /**
   * @description: 此方法用于：创建菜单的中间件
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async create(ctx) {
    const menu = ctx.request.body
    const result = await menuService.create(menu)

    ctx.body = {
      code: 0,
      msg: '创建菜单成功~',
      data: result
    }
  }

  /**
   * @description: 此方法用于：删除菜单
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async remove(ctx) {
    const { menuId } = ctx.params;
    const result = await menuService.remove(menuId)

    try {
      ctx.body = {
        code: 0,
        msg: '删除菜单成功~',
        data: result
      }
    } catch (err) {
      if (err.code === 'ER_ROW_IS_REFERENCED_2') return ctx.app.emit('error', ROW_IS_REFERENCED, ctx)
    }
  }

  /**
   * @description: 此方法用于：修改菜单的中间件
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async update(ctx) {
    const { menuId } = ctx.params;
    const menuInfo = ctx.request.body

    const result = await menuService.update(menuId, menuInfo)

    ctx.body = {
      code: 0,
      msg: '修改菜单成功~',
      data: result
    }
  }

  /**
   * @description: 此方法用于：查询完整菜单的中间件
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async list(ctx, next) {
    const result = await menuService.wholeMenu()

    ctx.body = {
      code: 0,
      msg: '获取完整菜单成功~',
      data: {
        list: result
      }
    }
  }
}

module.exports = new MenuController()