/**
 * Created by darren on 2018/4/10.
 */
var mongoose = require('mongoose')
var articleSchema = require('../Schemas/article')

module.exports = mongoose.model('Article', articleSchema)
