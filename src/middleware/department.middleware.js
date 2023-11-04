const departmentService = require('../service/department.service')
const verifyNameRequired = require('./handle-error/verifyNameRequired')
const verifyNameAlreadyExist = require('./handle-error/verifyNameAlreadyExist')

/**
 * @description: 此中间件用于：验证新增的部门是否可以保存到数据库
 * @Author: ZeT1an
 * @param {*} ctx koa ctx
 * @param {*} next koa next
 * @return {*}
 */
const verifyDepartment = async (ctx, next) => {
  const { name } = ctx.request.body;
  // 1.验证部门名称是否为空
  if (!verifyNameRequired(name, '部门名')) return

  // 2.判断 部门名称，是否在数据库中已存在
  const departments = await departmentService.findDepartmentByName(name)
  if (!verifyNameAlreadyExist(ctx, departments, '部门名')) return

  await next()
}

module.exports = {
  verifyDepartment
}