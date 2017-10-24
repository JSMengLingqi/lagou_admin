var express = require('express')
var router = express.Router()

// 定义根路由
router.get('/', function (req, res, next) {
  res.redirect('/index.html')
})

//将根路由暴露出去
module.exports = router
