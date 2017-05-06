// Access Layer for Token Data.

// NOTES:
// .population() specifies the references that you want
// mongodb to fill in with the corresponding document
// instead of returning an id.

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('api:dal-token');
var moment  = require('moment');

var Token        = require('../models/token');

var population = [{
  path: 'user'
}];

/**
 * create a new token.
 *
 * @desc  creates a new token and saves them
 *        in the database
 *
 * @param {Object}  tokenData  Data for the token to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(tokenData, cb) {
  debug('creating a new token');

  // Create token
  var tokenModel  = new Token(tokenData);

  tokenModel.save(function saveToken(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token);

    });

  });

};

/**
 * delete a token
 *
 * @desc  delete data of the token with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting token: ', query);

  Token
    .findOne(query)
    .populate(population)
    .exec(function deleteToken(err, token) {
      if (err) {
        return cb(err);
      }

      if(!token) {
        return cb(null, {});
      }

      token.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, token);

      });

    });
};

/**
 * update a token
 *
 * @desc  update data of the token with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating token: ', query);

  var now = moment().toISOString();

  updates.last_modified = now;

  Token
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateToken(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token || {});
    });
};

/**
 * get a token.
 *
 * @desc get a token with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting token ', query);

  Token
    .findOne(query)
    .populate(population)
    .exec(function(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token || {});
    });
};

/**
 * get a collection of tokens
 *
 * @desc get a collection of tokens from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of tokens');

  Token.find(query)
    .populate(population)
    .exec(function getTokensCollection(err, tokens) {
      if(err) {
        return cb(err);
      }

      return cb(null, tokens);
  });

};
