const connection = require('../app/database')
const menuService = require('./menu.service')

class RoleService {
  /**
   * @description: 此函数用于：在 role 表中，插入角色记录。
   * @Author: ZeT1an
   * @param {*} role
   * @return {*}
   */
  async create(role) {
    // 编写 sql 语句
    const statement = `INSERT INTO role SET ?;` // 插入数据时，使用 SET，将 JS 对象，转化成记录数据。

    // 执行 sql
    const [result] = await connection.query(statement, [role]) // role 为对象，其中 key 为表中字段名，value 为要插入的值。
    return result
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
   * @param {*} roleId
   * @param {*} menuIds
   * @return {*}
   */
  async assignmenu(roleId, menuIds) {
    // 1.先删除之前的关系
    const deleteStatement = `DELETE FROM role_menu WHERE role_id = ?`

    await connection.query(deleteStatement, [roleId])

    // 2.差人新的值
    const insertStatement = `INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?);`

    for (const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId])
    }
  }
}

module.exports = new RoleService()
