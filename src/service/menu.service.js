const connection = require('../app/database')

class MenuService {
  /**
   * @description: 此方法用于：创建菜单
   * @Author: ZeT1an
   * @param {*} {name, type, icon, parentId, url, permission, sort} menuInfo
   * @return {*}
   */
  async create(menuInfo) {
    const { name, type } = menuInfo
    let { parentId, sort, icon, url, permission } = menuInfo
    parentId ??= null
    sort = parseInt(sort)
    icon ||= null
    url ||= null
    permission ||= null

    const statement = `INSERT INTO menu (name, type, icon, parent_id, url, permission, sort) VALUES (?, ?, ?, ?, ?, ?, ?);`

    const [result] = await connection.query(statement, [
      name,
      type,
      icon,
      parentId,
      url,
      permission,
      sort
    ])
    return result
  }

  /**
   * @description: 此方法用于：根据 id，删除菜单
   * @Author: ZeT1an
   * @param {*} menuId 菜单 id
   * @return {*}
   */
  async remove(menuId) {
    const statement = 'DELETE FROM menu WHERE id = ?'
    const [result] = await connection.execute(statement, [menuId])
    return result
  }

  /**
   * @description: 此方法用于：修改菜单
   * @Author: ZeT1an
   * @param {*} menuId 菜单id
   * @param {*} menuInfo 菜单信息
   * @return {*}
   */
  async update(menuId, menuInfo) {
    const { name, type } = menuInfo
    let { parentId, sort, icon, url, permission } = menuInfo
    parentId ||= null
    sort = parseInt(sort)
    icon ||= null
    url ||= null
    permission ||= null

    const statement = `UPDATE menu SET name = ?, type = ?, icon = ?, parent_id = ?, url = ?, permission = ?, sort = ? WHERE id = ?;`

    const [result] = await connection.execute(statement, [
      name,
      type,
      icon,
      parentId,
      url,
      permission,
      sort,
      menuId
    ])
    return result
  }

  /**
   * @description: 此方法用于：判断是否有重名的菜单名称
   * @Author: ZeT1an
   * @param {*} name
   * @return {*}
   */
  async findMenuByName(name) {
    const statement = 'SELECT * FROM menu WHERE name = ?'

    const [values] = await connection.execute(statement, [name])
    return values
  }

  /**
   * @description: 此方法用于：判断在数据库中是否已经存在别的菜单那有相同的名称
   * @Author: ZeT1an
   * @param {*} menuId 菜单 Id
   * @param {*} name 菜单名称
   * @return {*}
   */
  async findMenuWithDiffName(menuId, name) {
    const statement = 'SELECT * FROM menu WHERE name = ? AND id != ?;'
    const [values] = await connection.execute(statement, [name, menuId])
    return values
  }

  /**
   * @description: 此方法用于：获取所有的菜单列表
   * @Author: ZeT1an
   * @return {*}
   */
  async wholeMenu() {
    const statement = `
      SELECT
        m1.id id,
        m1.name name,
        m1.type type,
        m1.url url,
        m1.icon icon,
        m1.sort sort,
        m1.permission permission,
        m1.create_at createAt,
        m1.update_at updateAt,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", m2.id,
              "name", m2.name,
              "type", m2.type,
              "parentId", m2.parent_id,
              "url", m2.url,
              "sort", m2.sort,
              "permission", m2.permission,
              "createAt", m2.create_at,
              "updateAt", m2.update_at,
              "children", (
                SELECT
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                      "id", m3.id,
                      "name", m3.name,
                      "type", m3.type,
                      "parentId", m3.parent_id,
                      "url", m3.url,
                      "sort", m3.sort,
                      "permission", m3.permission,
                      "createAt", m3.create_at,
                      "updateAt", m3.update_at
                    )
                  )
                FROM
                  menu m3
                WHERE
                  m3.parent_id = m2.id
                ORDER BY
                  m3.sort
              ))
          )
        FROM
          menu m2
        WHERE
          m1.id = m2.parent_id
        ORDER BY
          m2.sort
        ) children
      FROM
        menu m1
      WHERE
        m1.type = 1;
    `
    const [result] = await connection.query(statement)
    return result
  }

  /**
   * @description: 此方法用于：根据角色 Id，获取菜单列表。
   * @Author: ZeT1an
   * @param {*} roleId
   * @return {*}
   */
  async getMenuByRoleId(roleId) {
    const statement = `
      SELECT
        m1.id id,
        m1.name name,
        m1.type type,
        m1.url url,
        m1.icon icon,
        m1.sort sort,
        m1.create_at createAt,
        m1.update_at updateAt,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "id", m2.id,
              "name", m2.name,
              "type", m2.type,
              "parentId", m2.parent_id,
              "url", m2.url,
              "sort", m2.sort,
              "createAt", m2.create_at,
              "updateAt", m2.update_at,
              "children", (
                SELECT
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                      "id", m3.id,
                      "name", m3.name,
                      "type", m3.type,
                      "parentId", m3.parent_id,
                      "url", m3.url,
                      "sort", m3.sort,
                      "permission", m3.permission,
                      "createAt", m3.create_at,
                      "updateAt", m3.update_at
                    )
                  )
                FROM
                  menu m3
                RIGHT JOIN role_menu rm3
                  ON rm3.menu_id = m3.id
                WHERE
                  m3.parent_id = m2.id AND rm3.role_id = ?
                ORDER BY
                  m3.sort
              ))
          )
        FROM
          menu m2
        RIGHT JOIN role_menu rm2
          ON rm2.menu_id = m2.id
        WHERE
          m1.id = m2.parent_id AND rm2.role_id = ?
        ORDER BY
          m2.sort
        ) children
      FROM role_menu rm1
      LEFT JOIN menu m1
        ON rm1.menu_id = m1.id
      WHERE rm1.role_id = ? AND m1.type = 1
    `
    const [menus] = await connection.query(statement, [roleId, roleId, roleId])
    return menus
  }
}

module.exports = new MenuService()
