'use strict';
var models = require("../../db/models");
var Product = models.Product;
var User = models.User;
var Review = models.Review;
var router = require('express').Router();
var Order = models.Order;
var Orderproduct = models.Orderproduct;
var Promise = require('bluebird');


router.get('/', function(req, res, next){
    if(!req.user.isAdmin) res.sendStatus(403);
    return Order.findAll({
        where: req.query
    })
    .then(function(orders){
        return res.json(orders);
    });
});

router.post('/checkout/:address', function(req,res,next){
    var orderProm = Order.create({
        status: 0,
        address: req.params.address
    });
    var userProm = User.findOne({
        where: {
            id: req.user.id
        }
    });
    Promise.all([orderProm, userProm])
    .spread(function(order,user){
        if (user){
            return order.setUser(user);
        }else{
            return order;
        }
        console.log("passed order is: ", order);
    })
    .then(function(order){
        console.log("Created order is: ", order);
        console.log("Cart ids array is:", req.body);
        Promise.each(req.body, function(productId){
            return Orderproduct.findOrCreate({
                where: {
                    orderId: order.id,
                    productId: productId
                },
                defaults: {
                    orderId: order.id,
                    quantity: 0,
                    productId: productId
                }
            })
            .then(function(foundOrCreated){
                //findOrCreate returns an array, so
                var orderProduct = foundOrCreated[0];
                orderProduct.increment('quantity');
            })
        });
    })
    .then(function(){
        res.sendStatus(200);
    })
})

/*router.post('/', function(req, res, next){
    if(!req.user.isAdmin) res.sendStatus(403);
    return Order.create(req.body)
    .then(function(createdOrder){
        return res.json(createdOrder);
    });
});*/

router.get('/:orderId', function(req, res, next){
    Order.findOne({
        where: {
            id: req.params.orderId
        }
    })
    .then(function(order){
        return res.json(order);
    })
    .catch(next);
});

/*router.put('/:orderId', function(req, res, next){
    if(!req.user.isAdmin) res.sendStatus(403);
    Order.findOne({
        where: {
            id: req.params.orderId
        }
    })
    .then(function(order){
        return order.update(req.body);
    })
    .then(function(updatedOrder){
        return res.json(updatedOrder);
    })
    .catch(next);
});

router.delete('/:orderId', function(req, res, next){
    if(!req.user.isAdmin) res.sendStatus(403);
    Order.findOne({
        where: {
            id: req.params.orderId
        }
    })
    .then(function(order){
        return order.destroy(req.body);
    })
    .then(function(deletedOrder){
        return res.json(deletedOrder);
    })
    .catch(next);
});
*/

module.exports = router;
