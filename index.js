/**
 * Created by darren on 2018/3/5.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 引入模版文件
const swig = require('swig');

app.use(express.static('uploads'))

// jwt token
var jwt = require('express-jwt');
app.use(jwt({secret: 'jwt-secret', debug: true}).unless({
    path: ['/api/user/register', '/api/user/login', '/admin/user/login', '/works/list', '/works/detail']
}))

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        if (req.path.indexOf("/tourist") != -1) {
            next()
        } else {
            res.status(401).send('invalid token...');
        }
    }
});

// 设置模版引擎
app.engine('html',swig.renderFile);
// 设置模版文件存放目录 第一个参数固定为views
app.set('views','./views');
// 注册模版引擎，第一个参数固定为view engine
app.set('view engine','html');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 访问api接口
app.use('/api',require('./routers/api'));
app.use('/admin',require('./routers/admin'));
app.use('/article',require('./routers/article'));
app.use('/tourist',require('./routers/tourist'));
app.use('/works',require('./routers/works'));
app.use('/comment',require('./routers/comment'));

// 加载数据库模块
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(3000);
    }
});
