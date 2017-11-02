const db = require('../util/database.js')
//定义一个schema,里面定义的是数据库的结构
const schema = new db.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
  }
})


const User = db.model('users', schema)

//返回schema
module.exports = User
