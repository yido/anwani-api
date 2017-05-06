/**
 * Created by Yido on 2/25/2017.
 */
//~ Controller for Profile Entity.  ~//

/**
 * Load Module Dependencies.
 */

var events = require('events');
var debug = require('debug')('anwani-project');
var moment = require('moment');

var ProfileDal = require('../dal/profile');
var AddressDal = require('../dal/address');


/**
 * getAllProfile
 */
exports.getAll = function getAllProfile(req, res, next) {
    var workflow = new events.EventEmitter();
    workflow.on('performRequest', function performRequest() {
        ProfileDal.getCollection({},
            function callback(err, profiles) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profiles);
            })
    });
    workflow.on('respond', function (profiles) {
        debug('Profiles');
        res.status(201);
        res.json(profiles);
    });
    workflow.emit('performRequest');
};
/**
 * getProfile
 */
exports.getProfile = function getProfile(req, res, next) {
    var workflow = new events.EventEmitter();
    var profileId = req.params.profileId;

    workflow.on('performRequest', function performRequest() {
        ProfileDal.get(
            {
                "_id": profileId
            },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profile);
            })
    });
    workflow.on('respond', function (profile) {
        debug('profile');
        res.status(201);
        res.json(profile);
    });
    workflow.emit('performRequest');
};
/**
 * searchProfile
 */
exports.searchProfile = function searchProfile(req, res, next) {
    var workflow = new events.EventEmitter();
    var query = req.params.query;

    workflow.on('performRequest', function performRequest() {

        var regexValue = '\.*' + query + '\.';
        var exp = new RegExp(regexValue, 'i');
        ProfileDal.getCollection(
            {
                $or: [
                    {"first_name": exp},
                    {"middle_name": exp},
                    {"last_name": exp},
                    {"phone_number": exp}
                ]
            },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profile);
            })
    });
    workflow.on('respond', function (profile) {
        debug('profile');
        res.status(201);
        res.json(profile);
    });
    workflow.emit('performRequest');
};
/**
 * getAddress
 */
exports.getAddress = function getAddress(req, res, next) {
    var workflow = new events.EventEmitter();
    var profileId = req.params.profileId;

    workflow.on('performRequest', function performRequest() {
        ProfileDal.get(
            {
                "_id": profileId
            },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profile.addresses);
            })
    });
    workflow.on('respond', function (profiles) {
        debug('Profiles');
        res.status(201);
        res.json(profiles);
    });
    workflow.emit('performRequest');
};
/**
 * addProfile
 */
exports.addProfile = function addProfile(req, res, next) {
    debug('create profile...');

    var workflow = new events.EventEmitter();
    var body = req.body;
    var userId = req.params.userId;


    workflow.on('validateProfile', function validateProfile() {
        debug('validate Profile');
        //~ Validate Profile Data ~//

        req.checkBody('first_name', 'First Name is empty!')
            .notEmpty();
        req.checkBody('middle_name', 'Middle Name is empty!')
            .notEmpty();
        req.checkBody('last_name', 'Last Name is empty!')
            .notEmpty();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);

        } else {
            workflow.emit('createProfile');
        }
    });
    workflow.on('createProfile', function createProfile() {
        debug('create profile');
        ProfileDal.create({
                first_name: body.first_name,
                middle_name: body.middle_name,
                last_name: body.last_name,
                phone_number: body.phone_number
            },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profile);
            });
    });
    workflow.on('respond', function (profile) {
        debug('Profile');
        profile = profile.toJSON();
        res.status(201);
        res.json(profile);
    });
    workflow.emit('validateProfile');
};
/**
 * editProfile
 */
exports.editProfile = function editProfile(req, res, next) {
    var workflow = new events.EventEmitter();
    var body  = req.body;
    var profileId = req.params.profileId;

    workflow.on('validateEditInput',function validateEditInput() {
        req.checkBody('first_name','First Name can not be empty!')
            .notEmpty();
        req.checkBody('middle_name','Middle Name can not be empty!')
            .notEmpty();
        req.checkBody('last_name','Last Name can not be empty!')
            .notEmpty();


        var validationErrors = req.validationErrors();
        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        }
        workflow.emit('editProfile');

    });
    workflow.on('editProfile', function editProfile() {
        ProfileDal.update({
            _id : profileId,
            first_name: body.first_name,
            middle_name: body.middle_name,
            last_name: body.last_name
        },function callback(err,profile){

            if(err){
                next(err);
            }
            workflow.emit('respond',profile);
        });
    });
    workflow.on('respond', function (profile) {
        debug('profile');
        res.status(201);
        res.json(profile);
    });
    workflow.emit('validateEditInput');



};
/**
 * set profile picture
 */
exports.setProfilePicture = function setProfilePicture(req, res, next) {
    var workflow = new events.EventEmitter();
    var body  = req.body;
    var profileId = req.params.profileId;

    workflow.on('validateEditInput',function validateEditInput() {
        req.checkBody('picture','Picture can not be empty!')
            .notEmpty();

        var validationErrors = req.validationErrors();
        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        }
        workflow.emit('setProfilePicture');

    });
    workflow.on('setProfilePicture', function setProfilePicture() {
        ProfileDal.update({
            _id : profileId,
            picture: body.picture
        },function callback(err,profile){

            if(err){
                next(err);
            }
            workflow.emit('respond',profile);
        });
    });
    workflow.on('respond', function (profile) {
        debug('profile');
        res.status(201);
        res.json(profile);
    });
    workflow.emit('validateEditInput');



};
/**
 * deleteProfile
 */
exports.deleteProfile = function deleteProfile(req, res, next) {
    var workflow = new events.EventEmitter();
    var profileId = req.params.profileId;

    workflow.on('performRequest', function performRequest() {
        ProfileDal.delete(
            {
                "_id": profileId
            },
            function callback(err, profile) {
                if (err) {
                    return next(err);
                }
                workflow.emit('respond', profile);
            })
    });
    workflow.on('respond', function (profile) {
        debug('profile');
        res.status(201);
        res.json(profile);
    });
    workflow.emit('performRequest');
};




