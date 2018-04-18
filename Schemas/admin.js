/**
 * Created by darren on 2018/3/22.
 */
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 用户名
    userName: String,
    // 密码
    passWord: String,
    token: String
})