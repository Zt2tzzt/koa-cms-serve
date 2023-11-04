const connection = require('../app/database')

class DepartmentService {
  /**
   * @description: 此函数用于：在 department 表中，插入部门记录。
   * @Author: ZeT1an
   * @param {*} department: {name, leader, parentId} 角色和菜单信息
   * @return {*}
   */
    async create(department) {
      const { name, leader, parentId } = department
      const statement1 = `INSERT INTO department (name, leader, parent_id) VALUES (?, ?, ?);`
      const [result] = await connection.execute(statement1, [name, leader, parentId])
      
      return result
    }

  /**
   * @description: 此函数用于：获取完整的部门列表
   * @Author: ZeT1an
   * @return {*}
   */
  async wholeDepartmen() {
    const statement = `
      SELECT
        id,
        \`name\`,
        leader,
        parent_id parentId,
        create_at createAt,
        update_at updateAt
      FROM department d
    `

    const [result] = await connection.execute(statement)
    return result
  }

  /**
   * @description: 此函数用于：根据部门名，查询部门
   * @Author: ZeT1an
   * @param {string} name 部门名
   * @return {object} mysql 返回结果
   */
  async findDepartmentByName(name) {
    const statement = 'SELECT * FROM `department` WHERE name = ?;'
    const [values] = await connection.execute(statement, [name])

    return values
  }
}

module.exports = new DepartmentService()
