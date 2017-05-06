/**
 * Created by Yido on 2/25/2017.
 */

//~ Load Module Dependencies ~//
var express = require('express');


var userRouter    = require('./user');
var addressRouter   = require('./address');
var profileRouter = require('./profile');


//~ Export Router Initializater ~//
module.exports = function initRouter(app) {

    // Users Endpoint
    app.use('/users', userRouter);


    // Album Endpoint //
    app.use('/address', addressRouter);
    app.use('/profile', profileRouter);
};
