/**
 * Created by Yido on 2/25/2017.
 */
//~ Access Layer for Address Data. ~//

/**
 * Load Module Dependencies.
 */
var debug = require('debug')('api:dal-address');
var moment = require('moment');

var Address = require('../models/address');

var population = [{path:'owner',model:'Profile'}];


/**
 * create a new address.
 *
 * @desc  creates a new address and saves them
 *        in the database
 *
 * @param {Object}  addressData  Data for the user to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(addressData, cb) {
    debug('creating a new address');
    //~ Create address ~//
    var addressModel = new Address(addressData);
    addressModel.save(function saveAddress(err,data){
        if(err){
            cb(err)
        }

        exports.get({_id : data._id},function (err,address) {
            if(err){
                return cb(err)
            }

            cb(null,address);
        })
    });
};

/**
 * update a address
 *
 * @desc  update data of the address with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates, cb) {
    debug('updating address: ', query);

    var now = moment().toISOString();

    updates.last_modified = now;

    Address
        .findOneAndUpdate(query,updates)
        .populate(population)
        .exec(function (err,address) {
            if(err){
                cb(err);
            }
            cb(null,address || {});
        });
};

/**
 * delete a address
 *
 * @desc  delete data of the address with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
    debug('deleting address: ', query);

    Address
        .findOne(query)
        .populate(population)
        .exec(function deleteAddress(err,address) {
            if(err){
                return cb(err);
            }

            if(!address){
                cb(null, {});
            }

            address.remove(function (err) {
                if(err){
                    return cb(err);
                }
                cb(null,address);
            });
        });
};

/**
 * get a address.
 *
 * @desc get a address with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
    debug('getting address ', query);

    Address
        .findOne(query)
        .populate(population)
        .exec(function (err,address) {
            if(err){
                return cb(err);
            }

            cb(null,address || {});
        });
};

/**
 * get a collection of addresss
 *
 * @desc get a collection of addresss from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
    debug('fetching a collection of addresss');
    Address
        .find(query)
        .populate(population)
        .exec(function (err,addresss) {
            if(err){
                return cb(err);
            }
            cb(null,addresss);
        });
};