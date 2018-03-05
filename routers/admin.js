/**
 * Created by darren on 2018/3/5.
 */
const express = require('express');
const router = express.Router();
//
// router.get('/', (req, res, next)) => {
//     req.send('Hello, admin!');
//
// }

router.get('/', function (req, res, next) {
    res.send('admin')
});

module.exports = router;