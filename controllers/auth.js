// Load Module Dependencies
var events  = require('events');
var crypto  = require('crypto');

var debug  = require('debug')('gebeya-api');
var moment = require('moment');

var config   = require('../config');

var UserDal   = require('../dal/user');
var TokenDal  = require('../dal/token');

// Login Controller
exports.login = function login(req, res, next) {
  debug('Login User');

  var workflow = new events.EventEmitter();

  workflow.on('validateData', function validateData() {
    req.checkBody('username', 'Username is Invalid!')
        .notEmpty();
    req.checkBody('password', 'Password is Invalid!')
        .notEmpty();

    var errs = req.validationErrors();
    if(errs) {
      res.status(400);
      res.json(errs);
      return;
    }

    workflow.emit('validateUsername');

  });

  workflow.on('validateUsername', function validateUsername() {
    // Check Username
    UserDal.get({ username: req.body.username }, function done(err, user) {
      if(err) {
        return next(err);
      }

      if(!user._id){
        res.status(404);
        res.json({
          message: 'Wrong Credentials!'
        });
        return;
      }

      workflow.emit('validatePassword', user);
    });
  });

  workflow.on('validatePassword', function validatePassword(user) {
    // Check Password
    user.checkPassword(req.body.password, function done(err, isOk) {
      if(err) {
        return next(err);
      }

      if(!isOk) {
        res.status(403);
        res.json({
          message: 'Wrong Credentials!'
        });
        return;
      }

      workflow.emit('generateToken', user);
    });
  });

  workflow.on('generateToken', function generateToken(user) {

    TokenDal.get({ user: user._id }, function done(err, token) {
      if(err) {
        return next(err);
      }

      crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buf) {
        if(err) {
          return next(err);
        }

        var tokenValue = buf.toString('base64');

        // Generate a new token
        if(!token._id){
          var newExpDate = new Date().setHours(new Date().getHours() + 8);
          TokenDal.create({
                user: user._id,
                value: tokenValue,
                expires: new Date(newExpDate),
                revoked: false
              },
              function createToken(err, token) {
                if (err) {
                  return next(err);
                }

                workflow.emit('respond', user, tokenValue);
              });

        } else {
          // Update value with token exp date//
          var now = new Date();
          var newTokenExpDate = now.setHours(now.getHours() + 8);
          TokenDal.update({ _id: token._id }, { $set: { value: tokenValue,
            expires: new Date(newTokenExpDate), revoked: false } }, function updateToken(err, token) {
            if(err) {
              return next(err);
            }

            workflow.emit('respond', user, tokenValue);

          });
        }
      });

    });

  });

  workflow.on('respond', function respond(user, token) {
    var now = moment().toISOString();

    UserDal.update({ _id: user._id }, { last_login: now }, function updateLogin(err, user) {
      if(err) {
        return next(err);
      }

      user = user.toJSON();

      delete user.password;

      res.json({
        token: token,
        user: user
      });


    });
  });

  workflow.emit('validateData');

};


// Logout Controller
exports.logout = function logout(req, res, next) {

};
