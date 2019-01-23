const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Order = require('../models/order');
const Cart = require('../models/cart');

// Register
router.post('/order/register',(req, res, next) => {
    let order = new Order(); 
    order.menuList = req.body.menuList;
    order.menuItem = req.body.menuItem;
    order.itemDescription = req.body.itemDescription;
    order.price = req.body.price;

    order.save(function(err) {
        if (err) {
           res.send('failed to register');
        } else {
            res.send('Data is submitted Successfully')
        } 
    })
});

router.get('/order/success', (req,res) => {
    res.render('order/success')
});


router.get('/order/register/re/gi/st/er/new', (req, res) => {
    res.render('order/register');  
});

router.get('/order/checkout', (req, res) => {
    var cart = new Cart(req.session.cart);
    res.render('order/checkout',{  
        products: cart.generateArray(),      
        totalPrice: cart.totalPrice
    });  
});

router.get('/', (req, res) => { 
    res.render('order/order',{
        item_veg:  Order.find({"menuList": "Veg Staters"}).sort( {_id:-1}),
        item_non_veg:  Order.find({"menuList": "Non Veg Starters"}).sort( {_id:-1}),       
        item_tandoori:  Order.find({"menuList": "Tandoori Grill Specials"}).sort( {_id:-1}),       
        item_main_course:  Order.find({"menuList": "Main Course"}).sort( {_id:-1}),       
        item_gorkha_special:  Order.find({"menuList": "Gurkha Special Main Course"}).sort( {_id:-1}),       
        item_briyani_dishes:  Order.find({"menuList": "Biryani Dishes"}).sort( {_id:-1}),       
        item_Vegetarian:  Order.find({"menuList": "Vegetarian"}).sort( {_id:-1}),       
        item_rice:  Order.find({"menuList": "Rice"}).sort( {_id:-1}),       
        item_bread:  Order.find({"menuList": "Bread"}).sort( {_id:-1}),       
        item_kid_s:  Order.find({"menuList": "Kid S Menu"}).sort( {_id:-1}),       
        item_condiments:  Order.find({"menuList": "Condiments"}).sort( {_id:-1}),       
    });
});


router.get('/order/fullcart', (req, res) => { 
    // cart List batwa render gareko data 
    if(!req.session.cart){
        return res.render('partials/full_cart',{products: null});
    } else {
        var cart = new Cart(req.session.cart);
        res.render('partials/full_cart', {
            products: cart.generateArray(), 
            totalPrice: cart.totalPrice
        })
    }
});

router.get('/order/add-to-cart/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Order.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        else {
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        }
    });

});

router.get('/order/add/:id', (req,res,next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart = cart;
    res.redirect('/order/fullcart');
})
router.get('/order/reduce/:id', (req,res,next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/order/fullcart');
})

router.get('/order/remove-all/:id', (req,res,next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/order/fullcart');
})

 module.exports = router;


