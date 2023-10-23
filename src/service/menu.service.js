const connection = require('../app/database')

class MenuService {
  /**
   * @description: 此函数用于：
   * @Author: ZeT1an
   * @param {*} menu
   * @return {*}
   */
  async create(menu) {
    const statement = `INSERT INTO menus SET ?;`

    const [result] = await connection.query(statement, [menu])
    return result
  }

  /**
   * @description: 此函数用于：获取所有的菜单列表
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
   * @description: 此函数用于：根据角色 Id，获取菜单列表。
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
