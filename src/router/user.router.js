const KoaRouter = require('@koa/router')
const {
  create,
  updateUserById,
  removeUserById,
  detail,
  list,
  showAvatarImage,
} = require('../controller/user.controller')
const { verifyUser, verifyUserinUpdate, handlePassword } = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/login.middleware')

// 创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 增：用户注册
userRouter.post('/', verifyAuth, verifyUser, handlePassword, create)

// 删：根据用户 id
userRouter.delete('/:userId', verifyAuth, removeUserById)

// 改：根据用户 id 修改用户
userRouter.patch('/:userId', verifyAuth, verifyUserinUpdate, updateUserById)

// 查：获取用户信息
userRouter.get('/:userId', verifyAuth, detail)

// 查：获取用户列表
userRouter.post('/list', verifyAuth, list)

// 查：获取用户头像
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter
