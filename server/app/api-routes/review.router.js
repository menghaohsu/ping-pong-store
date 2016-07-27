'use strict';
var models = require("../../db/models");
var Product = models.Product;
var User = models.User;
var Review = models.Review;
var router = require('express').Router();


router.get('/', function(req, res, next){
    return Review.findAll({
        where: req.query
    })
    .then(function(reviews){
        return res.json(reviews);
    });
});

router.post('/', function(req, res, next){
    return Review.create(req.body)
    .then(function(createdReview){
        return res.json(createdReview);
    });
});

router.get('/:reviewId', function(req, res, next){
    Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })
    .then(function(review){
        return res.json(review);
    })
    .catch(next);
});

router.put('/:reviewId', function(req, res, next){
    Order.findOne({
        where: {
            id: req.params.reviewId
        }
    })
    .then(function(review){
        if(review.userId !== req.user.id || !req.user.isAdmin) res.sendStatus(403);
        return review.update(req.body);
    })
    .then(function(updatedReview){
        return res.json(updatedReview);
    })
    .catch(next);
});

router.delete('/:reviewId', function(req, res, next){
    Order.findOne({
        where: {
            id: req.params.reviewId
        }
    })
    .then(function(review){
        if(review.userId !== req.user.id || !req.user.isAdmin) res.sendStatus(403);
        return review.destroy();
    })
    .then(function(deletedReview){
        return res.json(deletedReview);
    })
    .catch(next);
});


module.exports = router;
