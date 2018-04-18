/**
 * Created by darren on 2018/4/11.
 */
var mongoose = require('mongoose')
var commentSchema = require('../Schemas/comment')

module.exports = mongoose.model('Comment', commentSchema)