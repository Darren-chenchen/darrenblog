/**
 * Created by darren on 2018/4/16.
 */
/**
 * Created by darren on 2018/4/10.
 */
var mongoose = require('mongoose')
var worksSchema = require('../Schemas/works')

module.exports = mongoose.model('Works', worksSchema)
