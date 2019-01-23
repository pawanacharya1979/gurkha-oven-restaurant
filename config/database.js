const f = require('util').format;
const assert = require('assert');


const user = encodeURIComponent('sundar');
const password = encodeURIComponent('sun');

module.exports = {
    database : f('mongodb://%s:%s@ds135537.mlab.com:35537/gurkhaoven', user, password) 
}


// module.exports = {
//     database: 'mongodb://localhost:27017/gurkhaoven'   
// }

