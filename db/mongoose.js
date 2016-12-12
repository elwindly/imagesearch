const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var env = process.env.NODE_ENV || 'development';


process.env.MONGODB_URI = 'mongodb://elwindly:7ImmuraN500@ds050539.mlab.com:50539/todo';

if(env ==='development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/lastten';
}

mongoose.connect(process.env.MONGODB_URI );

module.exports ={mongoose};