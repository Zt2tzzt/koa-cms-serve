const connection = require('../app/database')

class DepartmentService {
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
        (SELECT name FROM user WHERE id = d.leader_id) leader,
        parent_id parentId,
        create_at createAt,
        update_at updateAt
      FROM department d
    `

    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new DepartmentService()