/**
 * Created by Yido on 2/25/2017.
 */

/* LOAD ALL Module Dependencies */
var express      = require('express');
var bodyParser   = require('body-parser');
var debug        = require('debug')('anwani-project');
var mongoose     = require('mongoose');
var validator    = require('express-validator');

var config       = require('./config');

var router       = require('./routes');
var authenticate = require('./lib/authenticate');

//~ Connect to MongoDb ~//
mongoose.connect(config.MONGODB_URL);

//~ listen to connection event ~//
mongoose.connection.on('connected',function mongodbConnectionListener(){
     debug('Mongodb Connected successfully');
});

mongoose.connection.on('error',function mongodbErrorListener(){
    debug('Connection to Mongodb Failed!!');
});

//~ Configuration ~//

//~ Initialize app ~//
var app = express();

//~ Authentication Middleware ~//
app.use(authenticate().unless({
    path: ['/users/login','/users/signup']
}));

//~ Set Middleware ~//
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//~ Set Validator ~//
app.use(validator());

//~ Set Routes ~//
router(app);

//~ Listen to HTTP Port ~//
app.listen(config.HTTP_PORT,function connectionListener() {
   debug('API Server is running on port %s',config.HTTP_PORT);
});

