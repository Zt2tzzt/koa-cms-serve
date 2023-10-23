const roleService = require('../service/role.service')
const menuService = require('../service/menu.service')

class RoleController {
  /**
   * @description: 此函数用于：创建角色
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async create(ctx) {
    // 1.获取到角色的对象信息
    const role = ctx.request.body
    console.log('role:', role)

    // 2.将数据插入到数据库中。
    const result = await roleService.create(role)

    // 3.返回结果
    ctx.body = {
      code: 0,
      msg: '创建角色成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：删除角色和角色的菜单
   * @Author: ZeT1an
   * @param {*} ctx
   * @param {*} next
   * @return {*}
   */
  async remove(ctx, next) {
    
  }

  /**
   * @description: 此函数用于：更新用户信息
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async update(ctx) {
    const { roleId } = ctx.params
    const roleInfo = ctx.request.body

    const result = await roleService.update(roleId, roleInfo)

    ctx.body = {
      code: 0,
      msg: '修改角色成功~',
      data: result
    }
  }

  /**
   * @description: 此函数用于：查询角色列表
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async listWithMenus(ctx) {
    // 1.获取角色基本信息
    const { offset = 0, limit = 10 } = ctx.query
    const result = await roleService.list(Number(offset), Number(limit))

    // 2.获取菜单信息
    for (const role of result) {
      const menuList = await menuService.getMenuByRoleId(role.id)
      role.menuList = menuList
    }

    // 3.返回响应结果
    ctx.body = {
      code: 0,
      msg: '获取完整角色列表成功~',
      data: {
        list: result,
        totalCount: result.length
      }
    }
  }

  /**
   * @description: 此函数用于：获取角色的菜单
   * @Author: ZeT1an
   * @param {*} ctx
   * @return {*}
   */
  async detailWithMenus(ctx) {
    const { roleId } = ctx.params;

    const values = await menuService.getMenuByRoleId(roleId)

    ctx.body = {
      code: 0,
      msg: '获取角色详情成功~',
      data: values
    }
  }


}

module.exports = new RoleController()
