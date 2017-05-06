// Load Module Dependencies
var async   = require('async');

module.exports = function authorize(types) {

  return function middleware(req, res, next) {
    var user = req._user;

    if(!user) {
      res.status(401);
      res.json({
        message: 'You Are Not Allowed To Complete This Action!'
      });
      return;
    }

    var isOk = false;

    types.forEach(function iterator(type) {
      if(user.role === type || user.realm === type) {
        isOk = true;
      }
    });

    if(!isOk) {
      res.status(401);
      res.json({
        message: 'You Are Not Allowed To Complete This Action!'
      });
      return;

    } else {
      return next();

    }

  };

}
