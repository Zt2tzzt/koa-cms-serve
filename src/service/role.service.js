const connection = require('../app/database')
const menuService = require('./menu.service')

class RoleService {
  /**
   * @description: 此函数用于：在 role 表中，插入角色记录。
   * @Author: ZeT1an
   * @param {*} role: {name, intro, menuList} 角色和菜单信息
   * @return {*}
   */
  async create(role) {
    const { name, intro, menuList } = role
    const statement1 = `INSERT INTO role (name, intro) VALUES (?, ?);` // 插入数据时，使用 SET，将 JS 对象，转化成记录数据。
    const [roleRes] = await connection.execute(statement1, [name, intro]) // role 为对象，其中 key 为表中字段名，value 为要插入的值。

    const roleId = roleRes.insertId
    const roleMenuRes = await this.assignmenu(roleId, menuList)
    return { roleRes, roleMenuRes }
  }

  /**
   * @description: 此函数用于：更新角色信息。
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @param {*} roleInfo { name, intro, menuList } 角色信息
   * @return {*}
   */
  async update(roleId, roleInfo) {
    const { name, intro, menuList } = roleInfo

    const statement = `UPDATE role SET name = ?, intro = ? WHERE id = ?;`
    const [roleRes] = await connection.execute(statement, [name, intro, roleId])

    const roleMenuRes = await this.assignmenu(roleId, menuList)
    return { roleRes, roleMenuRes }
  }

  /**
   * @description: 此函数用于：查询 role 表中的记录
   * @Author: ZeT1an
   * @param {*} offset
   * @param {*} limit
   * @return {*}
   */
  async list(offset, limit) {
    const statement = `SELECT * FROM role LIMIT ?, ?;`

    // 使用 query 方法，要求传入的 offset, limit 必须是 number 类型。
    const [result] = await connection.query(statement, [offset, limit])
    return result
  }

  /**
   * @description: 此函数用于：为角色分配菜单权限，删除原有的记录，向 role_menu 表中插入记录。
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @param {*} menuIds 角色的菜单 id
   * @return {*}
   */
  async assignmenu(roleId, menuIds) {
    // 1.先删除之前的关系
    const statement1 = `DELETE FROM role_menu WHERE role_id = ?`
    await connection.execute(statement1, [roleId])

    // 2.差人新的值
    const statement2 = 'INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?);'
    const roleMenuRes = await Promise.all(menuIds.map(menuId => connection.execute(statement2, [roleId, menuId]).then(res => res[0])));

    return roleMenuRes
  }
}

module.exports = new RoleService()
