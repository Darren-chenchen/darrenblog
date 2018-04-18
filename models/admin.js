/**
 * Created by darren on 2018/3/22.
 */
var mongoose = require('mongoose')
var adminSchema = require('../Schemas/admin')

module.exports = mongoose.model('Admin', adminSchema)
