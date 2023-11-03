const { convertISO8601Time } = require('./cover-time')

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
    const value = params[key]
    if (value === undefined || value=== null || value === '') return

    switch (key) {
      case 'createAt':
        whereClause +=
          whereClause.length > 0 ? ` AND create_at BETWEEN ? AND ?` : ` create_at BETEEW ? AND ?`
        conditions.push(...[convertISO8601Time(value[0]), convertISO8601Time(value[1])])
        return
      case 'offset':
      case 'size':
        return
      default:
        whereClause += whereClause.length > 0 ? ` AND ${key} = ?` : ` ${key} = ?`
        conditions.push(value)
    }
  })

  if (whereClause.length) whereClause = 'WHERE' + whereClause
  conditions.push(offset, size)

  return [whereClause, conditions]
}

module.exports = getWhereclauseAndConditionByParams
