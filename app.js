var express = require('express')
var app = express()
var path = require('path')

var staticRoute = require('./routes/static')

// 监听端口号
app.listen(process.env.PORT || '3000')

// 路由使用的中间件是static.js
app.use('/', staticRoute)

// 设置静态路径
app.use(express.static(path.join(__dirname, 'public')))
