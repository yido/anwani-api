// Load Module Dependencies //
var mongoose  = require('mongoose');
var bcrypt    = require('bcrypt');
var moment    = require('moment');

var config    = require('../config');

var Schema  = mongoose.Schema;

// Define User Attributes //
var UserSchema = new Schema({
  username:   { type: String },
  password:   { type: String },
  realm:      { type: String, default: 'user' },
  status:     { type: String, default: 'active' },
  user_type:    { type: String },
  profile:      { type: Schema.Types.ObjectId, ref: 'Profile' },
  shared_addresses : [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  last_login:   { type: Date },
  date_created: { type: Date },
  last_modified:{ type: Date }
});


// Add a pre save hook
UserSchema.pre('save', function preSaveHook(next) {
  var model = this;

  bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
    if(err) {
      return next(err);
    }

    bcrypt.hash(model.password, salt, function hashPasswd(err, hash) {
      if(err) {
        return next(err);
      }

      var now = moment().toISOString();

      model.password = hash;
      model.date_created = now;
      model.last_modified = now;

      next();

    });
  });

});

// Compare Passwords Method
UserSchema.methods.checkPassword = function checkPassword(password, cb) {
  bcrypt.compare(password, this.password, function done(err, res) {
    if(err) {
      return cb(err);
    }

    cb(null, res);
  });

};
// Export User Model
module.exports = mongoose.model('User', UserSchema);
