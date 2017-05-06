// Load Module Dependencies
var events  = require('events');

var debug = require('debug')('gebeya-api');
var moment = require('moment');

var UserDal     = require('../dal/user');
var ProfileDal  = require('../dal/profile');
var AddressDal   = require('../dal/address');


/**
 * Get all users
 */
exports.getAll = function getAllUsers(req, res, next) {
  var workflow = new events.EventEmitter();
  workflow.on('performRequest', function performRequest() {
    UserDal.getCollection({},
        function callback(err, users) {
          if (err) {
            return next(err);
          }
          workflow.emit('respond', users);
        })
  });
  workflow.on('respond', function (users) {
    debug('Users');
    res.status(201);
    res.json(users);
  });
  workflow.emit('performRequest');
};

/**
 * Create User
 *
 * 1. Validate Data
 * 2. Create User
 * 3. Create Profile
 * 4. Create UserType
 * 5. Response
 */
exports.createUser = function createUser(req, res, next) {
  debug('create user');

  var workflow = new events.EventEmitter();
  var body = req.body;


  workflow.on('validateUser', function validateUser() {
    debug('validate user');
    // Validate User Data //
    req.checkBody('password', 'Pincode Invalid!')
      .notEmpty()
      .isLength(4);
    req.checkBody('username', 'Phonenumber Invalid!')
      .notEmpty();
    req.checkBody('first_name', 'First Name is empty!')
      .notEmpty();
    req.checkBody('middle_name', 'Middle Name is Empty!')
        .notEmpty();
    req.checkBody('last_name', 'Last Name is Empty!')
      .notEmpty();
    req.checkBody('user_type', 'User Type is Invalid!')
      .notEmpty().withMessage('User Type is Empty')
      .isIn(['individual', 'company', 'goverment']).withMessage('User Type can only be individual, company or goverment');

    var validationErrors = req.validationErrors();

    if(validationErrors) {
      res.status(400);
      res.json(validationErrors);

    } else {
      workflow.emit('createUser');
    }


  });

  workflow.on('createUser', function createUser() {
    debug('create user');
    // Create User
    UserDal.create({
      password: body.password,
      username: body.username,
      role: body.user_type,
      user_type:body.user_type,
      realm: body.realm ? body.realm : 'user'

    }, function callback(err, user) {
      if(err) {
        return next(err);
      }

      workflow.emit('createProfile', user);

    });


  });

  workflow.on('createProfile', function createProfile(user) {
    debug('create profile');
    // Create Profile //
    ProfileDal.create({
      user: user._id,
      first_name: body.first_name,
      middle_name: body.middle_name,
      last_name: body.last_name,
      display_name: (body.display_name !='undefined' ? body.display_name:body.first_name)
      // date_of_birth: body.date_of_birth,
      // gender: body.gender,
      // about: body.about,
      // is_public: body.is_public
    }, function callback(err, profile) {
      if(err) {
        return next(err);
      }


      UserDal.update({ _id: user._id }, { profile: profile._id }, function callback2(err, user) {
        if(err) {
          return next(err);
        }

        workflow.emit('respond', user, profile);

      });


    });


  });

  workflow.on('respond', function respond(user, profile) {
    debug('respond');
    user.profile = profile;
    user = user.toJSON();

    delete user.password;

    res.status(201);
    res.json(user);

  });

  workflow.emit('validateUser');

};

/**
 * Get single users
 */
exports.getUser = function getUser(req, res, next) {
  var workflow = new events.EventEmitter();
  var userId = req.params.userId;

  workflow.on('performRequest', function performRequest() {
    UserDal.get(
        {
          "_id": userId
        },
        function callback(err, user) {
          if (err) {
            return next(err);
          }
          workflow.emit('respond', user);
        })
  });
  workflow.on('respond', function (user) {
    debug('user');
    res.status(201);
    res.json(user);
  });
  workflow.emit('performRequest');
};

/**
 * editUser
 */
exports.editUser = function editUser(req, res, next) {

  var workflow = new events.EventEmitter();
  var userId = req.params.userId;
  var body  = req.body;

  workflow.on('validateEditInput',function validateEditInput() {

    req.checkBody('name', 'name is empty!')
        .notEmpty();
    req.checkBody('picture', 'attach one picture!')
        .notEmpty();
    req.checkBody('loc', 'location info is empty!')
        .notEmpty();

    var validationErrors = req.validationErrors();
    if(validationErrors){
      res.status(400);
      res.json(validationErrors);
    }
    workflow.emit('editUser');

  });
  workflow.on('editUser', function editUser() {
    UserDal.update({
      _id : userId ,
      name : body.name,
      picture :  body.picture,
      loc: body.loc,
      is_main:  body.is_main
    },function callback(err,user){

      if(err){
        next(err);
      }
      workflow.emit('respond',user);
    });
  });
  workflow.on('respond', function (user) {
    debug('user');
    res.status(201);
    res.json(user);
  });
  workflow.emit('validateEditInput');
};

/**
 * Delete users
 */
exports.deleteUser = function deleteUser(req, res, next) {
  var workflow = new events.EventEmitter();
  var userId = req.params.userId;

  workflow.on('performRequest', function performRequest() {
    UserDal.delete(
        {
          "_id": userId
        },
        function callback(err, user) {
          if (err) {
            return next(err);
          }
          workflow.emit('respond', user);
        })
  });
  workflow.on('respond', function (user) {
    debug('user');
    res.status(201);
    res.json(user);
  });
  workflow.emit('performRequest');
};
