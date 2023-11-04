const connection = require('../app/database')
const getWhereclauseAndConditionByParams = require('../utils/whereClauseAndCondition')

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
    const roleMenuRes = await this.assignRoleMenu(roleId, menuList)
    return { roleRes, roleMenuRes }
  }

  /**
   * @description: 此函数用于：根据角色 id，删除角色对应的菜单
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @return {*}
   */
  async removeRoleMenu(roleId) {
    // 1.先删除之前的关系
    const statement1 = `DELETE FROM role_menu WHERE role_id = ?`
    const [result] = await connection.execute(statement1, [roleId])
    return result
  }

  /**
   * @description: 此函数用于：为角色分配菜单权限，删除原有的记录，向 role_menu 表中插入记录。
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @param {*} menuIds 角色的菜单 id
   * @return {*}
   */
  async assignRoleMenu(roleId, menuIds) {
    const deleteRoleMenuREs = await this.removeRoleMenu(roleId)

    // 2.差人新的值
    const statement2 = 'INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?);'
    const assignRoleMenuRes = await Promise.all(
      menuIds.map(menuId => connection.execute(statement2, [roleId, menuId]).then(res => res[0]))
    )
    return { deleteRoleMenuREs, assignRoleMenuRes }
  }

  /**
   * @description: 此函数用于：根据 id，删除角色
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @return {*}
   */
  async remove(roleId) {
    const statement = `DELETE FROM role WHERE id = ?;`
    const [result] = await connection.execute(statement, [roleId])
    return result
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

    const roleMenuRes = await this.assignRoleMenu(roleId, menuList)
    return { roleRes, roleMenuRes }
  }

  /**
   * @description: 此函数用于：查询 role 表中的记录
   * @Author: ZeT1an
   * @param {*} params { size, offset, name, intro, createAt }
   * @return {*}
   */
  async list(params) {
    params.offset ||= 0
    params.size ||= 10

    const [whereClause, conditions] = getWhereclauseAndConditionByParams(params)

    // console.log('whereClause:', whereClause)
    // console.log('conditions:', conditions)

    const statement = `
      SELECT
        id,
        name,
        intro,
        create_at createAt,
        update_at updateAt
      FROM \`role\`
      ${whereClause}
      LIMIT ?, ?;
    `

    // console.log('statement:', statement)

    // 使用 query 方法，要求传入的 offset, limit 必须是 number 类型。
    const [result] = await connection.query(statement, conditions)
    return result
  }

  /**
   * @description: 此函数用于：根据角色名，查询角色
   * @Author: ZeT1an
   * @param {string} name 角色名
   * @return {object} mysql 返回结果
   */
  async findRoleByName(name) {
    const statement = 'SELECT * FROM `role` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])

    return values
  }

  /**
   * @description: 此函数用于：判断在数据库中是否已经存在别的角色有相同的 name
   * @Author: ZeT1an
   * @param {*} roleId 角色 id
   * @param {*} name 角色名
   * @return {*}
   */
    async findRoleWithDiffName(roleId, name) {
      const statement = 'SELECT * FROM `role` WHERE name = ? AND id != ?;'
      const [values] = await connection.execute(statement, [name, roleId])

      return values
    }
}

module.exports = new RoleService()
