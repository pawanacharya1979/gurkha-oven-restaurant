const mongoose = require('mongoose');
const config = require('../config/database');

// tscArticle Schema
const orderSchema = mongoose.Schema({
    menuList:{ type: String },  
    menuItem:{ type: String },  
    itemDescription:{ type: String },  
    price:{ type: Number } 
});

const Order = module.exports = mongoose.model('Order', orderSchema);
