/**
 * Created by darren on 2018/3/21.
 */

var mongoose = require('mongoose')
var userSchema = require('../Schemas/user')

module.exports = mongoose.model('User', userSchema)
