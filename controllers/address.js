/**
 * Created by Yido on 2/25/2017.
 */
//~ Controller for Address Entity.  ~//

/**
 * Load Module Dependencies.
 */

var events = require('events');
var debug = require('debug')('anwani-project');
var moment = require('moment');

var ProfileDal = require('../dal/profile');
var UserDal = require('../dal/user');
var AddressDal = require('../dal/address');


/**
 * Get all addresss
 */
exports.getAll = function getAllAddresss(req, res, next) {
    var workflow = new events.EventEmitter();
    workflow.on('performRequest', function performRequest() {
        AddressDal.getCollection({},
            function callback(err, addresss) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', addresss);
            })
    });
    workflow.on('respond', function (addresss) {
        debug('Addresss');
        res.status(201);
        res.json(addresss);
    });
    workflow.emit('performRequest');
};

/**
 * Get single addresss
 */
exports.getAddress = function getAddress(req, res, next) {
    var workflow = new events.EventEmitter();
    var addressId = req.params.addressId;

    workflow.on('performRequest', function performRequest() {
        AddressDal.get(
            {
                "_id": addressId
            },
            function callback(err, address) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', address);
            })
    });
    workflow.on('respond', function (address) {
        debug('address');
        res.status(201);
        res.json(address);
    });
    workflow.emit('performRequest');
};

/**
 * searchAddress
 */
exports.searchAddress = function searchAddress(req, res, next) {
    var workflow = new events.EventEmitter();
    var query = req.params.query;

    workflow.on('performRequest', function performRequest() {

        var regexValue = '\.*' + query + '\.';
        var exp = new RegExp(regexValue, 'i');
        AddressDal.getCollection(
            {
                $or: [
                    {"name": exp},
                    {"loc.lon": exp},
                    {"loc.lat": exp}
                ]
            },
            function callback(err, address) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', address);
            })
    });
    workflow.on('respond', function (address) {
        debug('address');
        res.status(201);
        res.json(address);
    });
    workflow.emit('performRequest');
};

/**
 * getAddressByUser
 */
exports.getAddressByUser = function getAddressByUser(req, res, next) {
    var workflow = new events.EventEmitter();
    var userId = req.params.userId;
    workflow.on('performRequest', function performRequest() {
        UserDal.get({
                "_id": userId
            },
            function callback(err, user) {
                if (err) {
                    return next(err);
                }

                workflow.emit('respond',user.profile.addresses);
            })
    });
    workflow.on('respond', function (addresss) {
        debug('Addresss');
        res.status(201);
        res.json(addresss);
    });
    workflow.emit('performRequest');
};

/**
 * getSharedAddressByUser
 */
exports.getSharedAddressByUser = function getSharedAddressByUser(req, res, next) {
    var workflow = new events.EventEmitter();
    var userId = req.params.userId;

    workflow.on('performRequest', function performRequest() {
        UserDal.get({
                "_id": userId
            },
            function callback(err, user) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', user.shared_addresses);
            })
    });
    workflow.on('respond', function (addresses) {
        debug('Addresss');
        res.status(201);
        res.json(addresses);
    });
    workflow.emit('performRequest');
};

/**
 * addAddress
 */
exports.addAddress = function addAddress(req, res, next) {
    debug('create address...');

    var workflow = new events.EventEmitter();
    var body = req.body;
    var profileId = req.params.profileId;

    workflow.on('validateAddress', function validateAddress() {
        debug('validate Address');
        //~ Validate Address Data ~//

        req.checkBody('name', 'name is empty!')
            .notEmpty();
        req.checkBody('picture', 'attach one picture!')
            .notEmpty();
        req.checkBody('loc', 'location info is empty!')
            .notEmpty();


        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);

        } else {
            workflow.emit('createAddress');
        }
    });
    workflow.on('createAddress', function createAddress() {
        debug('create address');
        AddressDal.create({
                name: body.name,
                picture :   body.picture,
                loc:   body.loc,
                is_main:  body.is_main,
                owner: {_id: profileId}
            },
            function callback(err, address) {
                if (err) {
                    console.log('error while creating address..');
                    return next(err);
                }
                workflow.emit('updateProfileAddresses', address);
            });
    });
    workflow.on('updateProfileAddresses', function updateProfileAddress(address) {
        debug('update profile address');
       console.log('update profile....profileId: '+profileId,address);
        ProfileDal.update( { _id : profileId },
            {$addToSet : {"addresses" : address} },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                console.log('about to respond',profile);
                workflow.emit('respond', profile);
            });
    });
    workflow.on('respond', function (profile) {
        debug('Address');
        profile = profile.toJSON();
        res.status(201);
        res.json(profile);
    });
    workflow.emit('validateAddress');
};

/**
 * shareAddress
 */
exports.shareAddress = function shareAddress(req, res, next) {
    debug('share address...');

    var workflow = new events.EventEmitter();
    var body = req.body;
    var addressId = req.params.addressId;
    var userId = req.params.userId;


    workflow.on('loadAddress', function loadAddress() {
        debug('load address');
        AddressDal.get(
            {
                "_id": addressId
            },
            function callback(err, address) {
                if (err) {
                    return next(err);
                }
                workflow.emit('shareAddress', address);
            });
    });
    workflow.on('shareAddress', function shareAddress(address) {
        debug('update user shared addresses');

        UserDal.update( { _id : userId },
            {$addToSet : {shared_addresses : address} },
            function callback(err, user) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', user);
            });
    });
    workflow.on('respond', function (user) {
        debug('Address');
        user = user.toJSON();
        res.status(201);
        res.json(user);
    });
    workflow.emit('loadAddress');
};

/**
 * removeSharedAddress
 */
exports.removeSharedAddress = function removeSharedAddress(req, res, next) {
    debug('remove shared address...');

    var workflow = new events.EventEmitter();
    var body = req.body;
    var addressId = req.params.addressId;
    var userId = req.params.userId;


    workflow.on('loadAddress', function loadAddress() {
        debug('load address');
        AddressDal.get(
            {
                "_id": addressId
            },
            function callback(err, address) {
                if (err) {
                    return next(err);
                }
                workflow.emit('shareAddress', address);
            });
    });
    workflow.on('shareAddress', function shareAddress(address) {
        debug('update user shared addresses');

        UserDal.update( { _id : userId },
            {$pull : { shared_addresses : address} },
            function callback(err, user) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', user);
            });
    });
    workflow.on('respond', function (user) {
        debug('Address');
        user = user.toJSON();
        res.status(201);
        res.json(user);
    });
    workflow.emit('loadAddress');
};

/**
 * editAddress
 */
exports.editAddress = function editAddress(req, res, next) {

    var workflow = new events.EventEmitter();
    var addressId = req.params.addressId;
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
        workflow.emit('editAddress');

    });
    workflow.on('editAddress', function editAddress() {
        AddressDal.update( {
            _id : body._id
        },{
            name : body.name,
            picture :  body.picture,
            loc: body.loc,
            is_main:  body.is_main
        },function callback(err,address){

            if(err){
                next(err);
            }
            workflow.emit('respond',address);
        });
    });
    workflow.on('respond', function (address) {
        debug('address');
        res.status(201);
        res.json(address);
    });
    workflow.emit('validateEditInput');
};

/**
 * Delete addresss
 */
exports.deleteAddress = function deleteAddress(req, res, next) {
    var workflow = new events.EventEmitter();
    var addressId = req.params.addressId;

    workflow.on('performRequest', function performRequest() {
        AddressDal.delete(
            {
                "_id": addressId
            },
            function callback(err, address) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', address);
            })
    });
    workflow.on('respond', function (address) {
        debug('address');
        res.status(201);
        res.json(address);
    });
    workflow.emit('performRequest');
};


