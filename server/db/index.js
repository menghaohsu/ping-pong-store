'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Product = require('./models/product');
var Order = require('./models/order');
var Review = require('./models/review');

//Relationships
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(Product);
Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);

