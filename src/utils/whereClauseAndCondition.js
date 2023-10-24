/**
 * @description: 此函数用于：根据查询 params，凭借 where sql 字句和 condition 参数数组
 * @Author: ZeT1an
 * @param {*} params { size, offset, ...otherInfo }
 * @return {*}
 */
const getWhereclauseAndConditionByParams = params => {
  const { size, offset } = params

  let whereClause = ''
  const conditions = []

  Object.keys(params).forEach(key => {
    if (!params[key]) return

    switch (key) {
      case 'createAt':
        whereClause +=
          whereClause.length > 0 ? ` AND create_at BETWEEN ? AND ?` : ` create_at BETEEW ? AND ?`
        conditions.push(...[params[key][0], params[key][1]])
        return
      case 'offset':
      case 'size':
        return
      default:
        whereClause += whereClause.length > 0 ? ` AND ${key} = ?` : ` ${key} = ?`
        conditions.push(params[key])
    }
  })

  if (whereClause.length) whereClause = 'WHERE' + whereClause
  conditions.push(offset, size)

  return [whereClause, conditions]
}

module.exports = getWhereclauseAndConditionByParams
