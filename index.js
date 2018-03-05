/**
 * Created by darren on 2018/3/5.
 */
var express = require('express');
var app = express();

// 访问后台页面
app.use('/admin',require('./routers/admin'));
// // 访问api接口
// app.use('/api',require('./router/api'));
// // 访问页面
// app.use('/',require('./router/main'));

app.get('/', function(res, rep) {
    rep.send('Hello, word!');
});

app.listen(3001);