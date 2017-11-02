var express = require('express')
var app = express()
var path = require('path')
var bodyParse = require('body-parser')
var cookieSession = require('cookie-session')

var staticRoute = require('./routes/static')
var apiRoute = require('./routes/api')

// 设置静态路径
app.use(express.static(path.join(__dirname, 'public')))

// 配置body解析器
// 获取前端提交的json字符串的
app.use(bodyParse.json())
// 获取前端表单form提交的数据
app.use(bodyParse.urlencoded({extended: false}))

// 使用服务器客户端数据通讯中间件，cookie-session
// session 过期时间 一天，单位是ms
app.use(cookieSession({
  name: 'session',
  secret: 'some random charactors',
  maxAge: 1000 * 60 * 60 * 24
}))

// 使用路由
app.use('/', staticRoute)
app.use('/api', apiRoute)

// 监听端口号
app.listen(process.env.PORT || '3000')
