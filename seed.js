var chalk = require('chalk');
var db = require('./server/db/_db.js');
var Models = require('./server/db/models');
var User = Models.User;
var Review = Models.Review;
var Product = Models.Product;

var Promise = require('sequelize').Promise;

var seedUsers = function () {
    var users = [
        {firstName:'Paul', lastName: 'Hsu', email: 'testing@fsa.com', password: 'Paul', address: '75 Wall St'},
        {firstName:'Yao', lastName: 'Chua', email: '123@fsa.com', password: 'Yao', address: '52 Mulberry St', isAdmin:true},
        {firstName:'John', lastName: 'Henry', email: 'erhigu@fsa.com', password: 'John', address: '9 S William St'},
        {firstName:'Will', lastName: 'Laeri', email: 'qwe@fsa.com', password: 'Will', address: '85 West Broadway'},
        {firstName:'Joe', lastName: 'Rogan', email: 'erf@fsa.com', password: 'Joe', address: '8 Stone St'},
        {firstName:'Tammy', lastName: 'Chu', email: 'sdv@fsa.com', password: 'Tammy', address: '91 E Broadway'},
        {firstName:'Julia', lastName: 'Julia`', email: 'oer@fsa.com', password: 'Julia`', address: '102 N End Ave'},
        {firstName:'Yuriy', lastName: 'Yolo', email: 'sdvowej@fsa.com', password: 'Yuriy', address: '55 Church St'},
        {firstName:'Jay', lastName: 'Johnson', email: 'jioreg@fsa.com', password: 'Jay', address: '106 Bowery'},
        {firstName:'Samuel', lastName: 'Severance', email: 'vdel@fsa.com', password: 'Samuel', address: '15 Gold Street'}
    ];
    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });
    return Promise.all(creatingUsers);
};

var seedProducts = function () {
    var products = [

        {price: '300', name: 'Recursion', category: 'Paddle', brand: "butterfly", inventory:'30', description:'good condition, great for curve ball', imageUrl:'http://www.killerspin.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/k/i/killerspin-kido-5a-rtg-table-tennis-racket-angle-red.png'},
        {price: '200', name: 'Offensive', category: 'Paddle', brand: "butterfly", inventory:'22', description:'good for offensive player', imageUrl:'http://i.ebayimg.com/images/i/251488549734-0-1/s-l1000.jpg'},
        {price: '100', name: 'Defensive', category: 'Paddle', brand: "butterfly", inventory:'5', description:'good for defenssive player', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/2/26/Tabletennis.jpg'},
        {price: '80', name: 'Control', category: 'Paddle', brand: "andro", inventory:'8', description:'good for control the ball', imageUrl:'http://robbinstabletennis.com/images/Panda-Aggressor.jpg'},
        {price: '150', name: 'Speedy', category: 'Paddle', brand: "julic", inventory:'14', description:'increase the balls speed', imageUrl:'http://i01.i.aliimg.com/img/pb/300/210/932/932210300_908.jpg'},
        {price: '345', name: 'Destroy', category: 'Paddle', brand: "donic", inventory:'12', description:'gread for smash', imageUrl:'http://www.allabouttabletennis.com/images/xrecommended-table-tennis-racket.jpg.pagespeed.ic.sXCs6YPrQW.jpg'},
        {price: '50', name: 'Ping-pong', category: 'Ball', brand: "butterfly", quality:'3', inventory:'46', description:'best Ball in the world', imageUrl:'http://d163axztg8am2h.cloudfront.net/static/img/85/3d/c2821e2805aedf71926b67e62fe9.jpg'},
        {price: '30', name: 'Ping-pong', category: 'Ball', brand: "butterfly", quality:'2', inventory:'23', description:'not bad but not good', imageUrl:'https://cdn.shopify.com/s/files/1/1102/7688/products/Master_Ball_Single_large.jpg?v=1464423413'},
        {price: '10', name: 'Ping-pong', category: 'Ball', brand: "butterfly", quality:'1', inventory:'198', description:'worst ball in the world', imageUrl:'http://rlv.zcache.com/pretty_monarch_butterfly_autumn_colors_ping_pong_ball-r2bfc469677b2487d98ba917f7aa4cd9f_6y0d3_324.jpg?rlvnet=1'},
        {price: '40', name: 'Ping-pong', category: 'Ball', brand: "donic", quality:'3', inventory:'24', description:'great ball', imageUrl:'http://g02.a.alicdn.com/kf/HTB148kPIpXXXXaIXpXXq6xXFXXX2/Donic-Table-Tennis-font-b-Ball-b-font-3-font-b-Star-b-font-font-b.jpg'},
        {price: '25', name: 'Ping-pong', category: 'Ball', brand: "donic", quality:'2', inventory:'74', description:'not great ball', imageUrl:'https://www.google.com/search?hl=zh-TW&authuser=0&biw=1349&bih=705&site=imghp&tbm=isch&sa=1&q=ping+pong+ball+donic+two+star&oq=ping+pong+ball+donic+two+star&gs_l=img.3...33621.36778.0.36906.9.9.0.0.0.0.88.537.9.9.0....0...1c.1.64.img..0.0.0.3ax7nfTNxWE#imgrc=t2hi1MEQKj0_kM%3A'},
        {price: '1', name: 'Ping-pong', category: 'Ball', brand: "donic", quality:'1', inventory:'12', description:'can use it as pokeball', imageUrl:'http://www.hurtowniasportowa.eu/eng_pl_Table-tennis-ball-Donic-Coach-orange-7116_2.jpg'},
        {price: '1500', name: 'Terminator', category: 'Robot', brand: "skynet", inventory:'15', description:'will destroy you!', imageUrl:'http://g01.a.alicdn.com/kf/HTB1_OVjIXXXXXX.XVXXq6xXFXXXB/Y-T-B3-3-Spins-font-b-Table-b-font-font-b-Tennis-b-font-font.jpg'},
        {price: '100', name: 'Robot-2000', category: 'Robot', brand: "paddle-palace", inventory:'20', description:'stupid robot ever!', imageUrl:'https://upload.wikimedia.org/wikipedia/commons/9/92/TOPIO_3.jpg'},
        {price: '800', name: 'Robot-2008', category: 'Robot', brand: "paddle-palace", inventory:'31', description:'dumb robot', imageUrl:'http://g01.a.alicdn.com/kf/UT8eFuKXaRcXXagOFbXt/200268814/UT8eFuKXaRcXXagOFbXt.jpg'},
        {price: '1200', name: 'Robot-2016', category: 'Robot', brand: "paddle-palace", inventory:'15', description:'smart robot ever!', imageUrl:'http://tabletennisnation.com/wp-content/uploads/2015/08/robot-ping-pong.gif'},
        {price: '1200', name: 'classic-25', category:'Table', brand: 'donic', inventory:'23', description:'perfect for those who want a world-class', imageUrl:'https://images-na.ssl-images-amazon.com/images/I/71CqOWllTsL._SL1500_.jpg'},
        {price: '1000', name: 'outdoor-25', category:'Table', brand: 'donic', inventory:'41', description:'waterproof!!', imageUrl:'http://sportinggoodschina.com/8-table-tennis-table/5-1b.jpg'},
        {price: '1750', name: 'premium-compact', category:'Table', brand: 'stiga', inventory:'10', description:'designed and engineered to combine a true tournament', imageUrl:'http://www.killerspin.com/media/wysiwyg/Content-Images/Home-Page/Killerspin-Revolution-Ping-Pong-Table-Tennis.jpg'},                
        {price: '750', name: 'beginner-25', category:'Table', brand: 'stiga', inventory:'31', description:'buy one get ten free', imageUrl:'http://austinartisan.org/img/projects/258/img_3420__cover.jpg'}
    ];
    var creatingProducts = products.map(function (productObj) {
        return Product.create(productObj);
    });
    return Promise.all(creatingProducts);
};

var seedReviews = function () {
    var reviews = [];
    var sample = ['good!!','excellent','best ever','bad!!','horrible!!','worst in the universe'];
    for(var i=1; i<21; i++){
      for(var j=1; j<11; j++){
        var obj={
            title: sample[Math.ceil(Math.random()*6-1)],
            score: Math.ceil(Math.random()*6-1),
            feedback: sample[Math.ceil(Math.random()*6-1)],
            userId: j,
            productId: i
        };
        reviews.push(obj);
      }  
    }
    var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });
    return Promise.all(creatingReviews);
}; 


db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedProducts();
    })
    .then(function(){
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
