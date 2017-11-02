const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//用户相关路由，其实就是访问页面时url的路径
router.post('/user/signUp', userController.signUp)
router.post('/user/signIn', userController.signIn)

module.exports = router
