const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';




if(env ==='development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/lastten';
}

mongoose.connect(process.env.MONGODB_URI );

module.exports ={mongoose};