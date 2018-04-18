/**
 * Created by darren on 2018/3/5.
 */
import {format} from '../helper/date'
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// 统一返回格式
var responseData;
router.use((req, res, next) => {
    responseData = {
        // 主要根据success来判断是否请求成功，code是一个预留的参数，比如前端需要根据code的不同值去做不同的操作
        // code 默认情况下都是0，只有在特殊接口中才返回不同的值，代表不同的意义
        success: true,
        code: 0,
        message: '',
        data: {}
    }
    next()
})

// 注册
router.post('/user/register', function (req, res, next) {
    var userName = req.body.userName
    var password = req.body.passWord
    var rePassWord = req.body.rePassWord

    if (userName === '') {
        responseData.success = false
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (password === '') {
        responseData.success = false
        responseData.message = '密码不能为空'
        res.json(responseData)
        return
    }
    if (password !== rePassWord) {
        responseData.success = false
        responseData.message = '两次输入的密码不一致'
        res.json(responseData)
        return
    }

    User.findOne({
        userName: userName
    }).then((userInfo) => {
        if (userInfo) { // 数据库中有
            responseData.success = false
            responseData.message = '该用户已存在'
            res.json(responseData)
            return
        } else {
            // 写入数据库
            //获取hash值  密码加密
            var hash = bcrypt.hashSync(password, 10)
            //把hash值赋值给password变量
            password = hash

            var myDate = new Date()
            let creat = format(myDate, 'yyyy/MM/dd HH:mm:ss')

            var user = new User({
                userName: userName,
                passWord: password,
                creatDateStr: creat,
                creatDate: new Date(),
            })
            return user.save()
        }
    }).then((newUserInfo) => {
        responseData.success = true
        responseData.message = '恭喜您，注册成功'
        responseData.data = {
            userName: newUserInfo.userName,
            userId: newUserInfo._id
        }
        res.json(responseData)
    })
});

// 登录
router.post('/user/login', function (req, res, next) {
    var userName = req.body.userName
    var password = req.body.passWord

    User.findOne({
        userName: userName
    }).then((userInfo) => {
        if (userInfo) {
            // 判断密码是否正确
            const pwdMatchFlag = bcrypt.compareSync(password, userInfo.passWord);
            if (pwdMatchFlag) {
                responseData.success = true
                responseData.message = '登录成功'
                responseData.data = {
                    userName: userInfo.userName,
                    userId: userInfo._id,
                    token: jwt.sign({
                        data: {_id:userInfo._id,username:userInfo.userName},
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)
                    }, 'jwt-secret')
                }
                res.json(responseData)
                return
            } else {
                responseData.success = false
                responseData.message = '密码错误'
                res.json(responseData)
                return
            }
        } else {
            responseData.success = false
            responseData.message = '该用户不存在'
            res.json(responseData)
            return
        }
    })
});

module.exports = router;