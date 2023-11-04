const connection = require('../app/database')
const getWhereclauseAndConditionByParams = require('../utils/whereClauseAndCondition')

class DepartmentService {
  /**
   * @description: 此函数用于：在 department 表中，插入部门记录。
   * @Author: ZeT1an
   * @param {*} departmentInfo: {name, leader, parentId} 角色和菜单信息
   * @return {*}
   */
  async create(departmentInfo) {
    const { name, leader, parentId } = departmentInfo
    const statement1 = `INSERT INTO department (name, leader, parent_id) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement1, [name, leader, parentId])

    return result
  }

  /**
   * @description: 此函数用于：此函数用于：更新部门信息
   * @Author: ZeT1an
   * @param {*} departmentId 部门 id
   * @param {*} departmentInfo { name ,leader, parentId } 部门信息
   * @return {*}
   */
  async update(departmentId, departmentInfo) {
    let { name, leader, parentId } = departmentInfo

    parentId ||= null
    const statement = `UPDATE department SET name = ?, leader = ?, parent_id = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [name, leader, parentId, departmentId])

    return result
  }

  /**
   * @description: 此函数用于：获取完整的部门列表
   * @Author: ZeT1an
   * @param {*} params: {name, leader, createAt} 角色和菜单信息
   * @return {*}
   */
  async findDepartmentListByParams(params) {
    const [whereClause, conditions] = getWhereclauseAndConditionByParams(params)

    // console.log('whereClause:', whereClause)
    // console.log('conditions:', conditions)

    const statement = `
      SELECT
        id,
        \`name\`,
        leader,
        parent_id parentId,
        create_at createAt,
        update_at updateAt
      FROM department d
      ${whereClause}
      LIMIT ?, ?;
    `

    // console.log('statement:', statement)

    const [result] = await connection.query(statement, conditions)
    return result
  }

  async wholeDepartmentList() {
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

  /**
   * @description: 此函数用于：判断在数据库中是否已经存在别的部门有相同的 name
   * @Author: ZeT1an
   * @param {*} departmentId 部门 id
   * @param {*} name 部门名称
   * @return {*}
   */
  async findDepartmentWithDiffName(departmentId, name) {
    const statement = 'SELECT * FROM `department` WHERE name = ? AND id != ?;'
    const [values] = await connection.execute(statement, [name, departmentId])

    return values
  }
}

module.exports = new DepartmentService()
