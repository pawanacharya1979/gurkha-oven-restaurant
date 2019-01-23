const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Order = require('../models/order'); // Order Scheam
const Cart = require('../models/cart');
const Delivery = require('../models/delivery'); // Delivery Schema

// Register
router.post('/checkout',(req, res, next) => {
    let delivery = new Delivery(); 

    delivery.fname = req.body.fname;
    delivery.lname = req.body.lname;
    delivery.phone = req.body.phone;
    delivery.email = req.body.email;
    delivery.deliveryTime = req.body.deliveryTime;
    delivery.foodNote = req.body.foodNote;
    delivery.deliveryNote = req.body.deliveryNote;
    delivery.voucher = req.body.voucher;
    delivery.pinCode = req.body.pinCode;
    delivery.address = req.body.address;
    delivery.deliveryCost = req.body.deliveryCost;
    delivery.totalPriceCost = req.body.totalPriceCost;
    delivery.ordType = req.body.ordType;
    console.log(delivery);

    /* 
    var orderedItem = req.body.orderedItem;
	console.log(req.body);
    for (val of orderedItem) {
    console.log(delivery.orderedItem.push(val));
     }
 
    var orderedPrice = req.body.orderedPrice;
    for (val of orderedPrice) {
   console.log(delivery.orderedPrice.push(val));
     }

    var orderedQty = req.body.orderedQty;
    for (val of orderedQty) {
    console.log(delivery.orderedQty.push(val));
     }*/

         var nodemailer = require('nodemailer');
    
var smtptransporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: 'apikey',
    pass: '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',
  }
});

var mailOptions = {
  from: 'gurkhaovenonlineorder.com',
  to: 'info@gurkhaoven.com',
  subject: 'Online order Status',
  text: 'You got Online Order.Please check Url.Thank You!.'   
};

   smtptransporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
   
  }
});
 
      var dateTime = require('node-datetime');
     var dt = dateTime.create();
      var formatted = dt.format('d-m-Y H:M:S');
      delivery.time = formatted;

    // delivery.orderedItem.push(test);

    for(var i=0; i< req.body.pcount; i++){
	delivery.orderedItem.push(eval('req.body.orderedItem'+i));
         delivery.orderedPrice.push(eval('req.body.orderedPrice'+i));
          delivery.orderedQty.push(eval('req.body.orderedQty'+i));
    }
   

    delivery.save(function(err) {
        if (err) {
           res.send('failed to register');
           
        } else {
            res.redirect('/order/success');           
        } 
    })
});


router.get('/for/the/customer/admin/sun', (req, res) => { 
    res.render('order/delivery_item',{
        deliver_item:  Delivery.find({}).sort( {_id:-1}).limit(30)      
    });
});


router.get('/delete-item/de/le/te/database', (req, res) => { 
    res.render('order/delete/delete_item',{
        deliver_item:  Delivery.find({}).sort( {_id:-1}).limit(30)      
    });
});



 module.exports = router;


