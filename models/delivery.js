const mongoose = require('mongoose');
const config = require('../config/database');

// tscArticle Schema
const deliverySchema = mongoose.Schema({
    fname:{ type: String },  
    lname:{ type: String },  
    phone:{ type: Number },  
    email:{ type: String },
    deliveryTime :{ type: String }, 
    foodNote:{ type: String },
    deliveryNote:{ type: String },
    voucher:{ type: String },
    pinCode:{ type: String },
    address:{ type: String },
    deliveryCost:{ type: String },
    totalPriceCost:{ type: String },
    orderedQty:{ type: Array },
    orderedItem:{ type: Array },
    orderedPrice:{ type: Array },
    ordType:{ type: String },
    time:{ type: String }
});

const Delivery = module.exports = mongoose.model('delivery', deliverySchema);
