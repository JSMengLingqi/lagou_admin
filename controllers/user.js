const bcrypt = require('bcrypt')
//在models目录下面创建了一个user.js
const User = require('../models/user.js')

const { getResponse } = require('../util/util.js')

const signUp = function (req, res, next) {
  //then是promise的一个调用方法。findOne是查找到数据之后进行的操作，是一个异步的，那么then就是成功以后的调用
  //findOne是到数据库中去查询数据存不存在，找到的话就对数据进行进一步的处理
  //then中的user是最后返回的结果，把这个结果存到数据库中
  User.findOne({username: req.body.username})
    .then((user)=>{
        //验证用户是否存在
        if(user){
          //json方法把对象转换为字符串，并send到前端页面上
          res.json(getResponse({success: false}))
        } else {
          //用户密码加密,then里面拿到加密好的password
          bcrypt.hash(req.body.password, 10)
            .then((password) => {
              let data = {
                username: req.body.username,
                password: password,
                email: req.body.email
              }
              //将处理好的数据放到user中，重新封装一个user对象
              const user = new User(data)
              //save()方法表示可以把得到的东西入库了
              user.save().then(() =>{
                res.json(getResponse({success: true}))
              })
            })
          }
    })
}

const signIn = function (req, res, next) {
  User.findOne({username: req.body.username})
    .then((user) => {
      //如果用户不存在
      if(!user){
        res.json(getResponse({login: false}))
      }else{
        // 将用户输入的req.body.password密码加密，并与数据库中存储的加密的密码作对比
        bcrypt.compare(req.body.password, user.password)
          .then((result) => {
            //如果密码正确
            if(result){
              // 这句话要想成功，必须要在app.js中配一下中间件才能用
              // 将后端查询到的值赋给前端session中的username，保存到cookie中
              // 设置session中的username字符串内容，目的是在前端始终能拿到我们的用户名
              req.session.username = user.username
              // 返回信息
              res.json(getResponse({
                login: true,
                username: user.username
              }))
            }else{
              res.json(getResponse({login: false}))
            }
          })
        res.json(getResponse({login: true}))
      }
    })
}

//题外话：京东如何保存用户登录信息。
//因为http协议是一个无状态协议，这就表示用户每次打开页面都要进行身份认证
//所以就采取了cookie和session（会话）来保存登录信息
//1、在后端，一旦用户登录成功，就创建一个session对象或者创建一个字符串放到session对象里面
//2、在给前端数据的时候，就把session的字符串，同时携带的返回给用户访问的页面
//3、用户访问的页面再把session保存到用户本地的硬盘中
//4、session是要依托于cookie。在浏览器中，前端通过cookie把session字符串存储起来
//5、这样一来，用户再访问第二个页面的时候，就拿它本地存储的cookie和服务器上的session字符串做比较
//如果一样，就能登陆了

module.exports = {signUp, signIn}
