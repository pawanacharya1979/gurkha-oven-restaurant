const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session); // alternate of mongo session to store data in local
const config = require('./config/database');


mongoose.Promise = global.Promise;
// Connect To Database  
mongoose.connect(config.database);

// On Connection Successful
mongoose.connection.on('connected',() =>{
    console.log('Connected to database ' +config.database);
 });

  // On Error Connection 
 mongoose.connection.on('error',(err) =>{
    console.log('Error to database connection ' +err);
});

// Models & Routes initialization to index page
const app = express();

// Set Static Public folder (SABAI CHANGE GARNWA BAKI XA HAI SALA TANAB GARXA YESLA SECURITY KO LAGI )
app.use(express.static(path.join(__dirname, 'public')));
app.use("/tether", express.static(__dirname + "/node_modules/tether/dist/"));
app.use("/popper", express.static(__dirname + "/node_modules/popper.js/dist/"));

// Routes initial Initialization
const home_page = require('./routes/home'); // Homepage
const Orders = require('./routes/orders')
const Delivery_item = require('./routes/delivery_item')
// Port Number to Start 
const port = process.env.PORT || 8080 ;

app.use(cors());
app.use(require('express-promise')()); // Express rendering

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
     // 
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
     store: new mongoStore({ mongooseConnection: mongoose.connection }),
     cookie: { maxAge: 280 * 60 * 1000 }
}));

app.use(function( req, res, next) {
    res.locals.session = req.session;
    next();
});

// view engine setup
app.set('views',path.join(__dirname,'views'));
app.engine(".hbs", exphbs({ defaultLayout: "mainlayout", extname: ".hbs"}));
app.set("view engine", ".hbs");

// app.use('/',home_page); 
app.use('/',Orders); 
// app.use('/order', Orders)
app.use('/deliver', Delivery_item)

// Server starting
app.listen(port, () => {
    console.log('server started on part '+port);
});