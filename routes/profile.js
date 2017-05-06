/**
 * Created by Yido on 2/25/2017.
 */
//~ Load Module Dependencies ~//
var express   =   require('express');

var profile  = require('../controllers/profile');

//~ Create a Router ~//
var router = express.Router();


/**
 * @api {get} /profile/all List all Profiles
 * @apiGroup Profiles
 * @apiSuccess {Object[]} profile Profile's list
 * @apiSuccess {Number} profile.id Profile id
 * @apiSuccess {Object} user User User Profile
 * @apiSuccess {String} profile.first_name Profile first_name
 * @apiSuccess {String} profile.middle_name Profile middle_name
 * @apiSuccess {String} profile.last_name Profile last_name
 * @apiSuccess {String} profile.display_name Profile display name
 * @apiSuccess {Boolean} profile.is_public is public profile?
 * @apiSuccess {Date} profile.updated_at Update's date
 * @apiSuccess {Date} profile.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"display_name" : "Yido",
 *		"is_public" : false,
 *		"addresses" : [
 * 	    {
 *	    	"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *	    	"name" : "FBI Church",
 *	    	"picture" : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
 *	    	"is_main" : false,
 *	    	"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *	    	"loc" : {
 *		    	"lon" : -989.877,
 *		    	"lat" : -9943.0973
 *	    	}
 *	    	],
 * 	    	"__v" : 0,
 *	    	"last_modified" : ISODate("2017-05-05T10:15:40.128Z")
 *  	 }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/all', profile.getAll);

/**
 * @api {get} /profile/:profileId Find an Profile
 * @apiGroup Profiles
 * @apiParam {id} id Profile id
 * @apiSuccess {Object[]} profile Profile's list
 * @apiSuccess {Number} profile.id Profile id
 * @apiSuccess {Object} user User User Profile
 * @apiSuccess {String} profile.first_name Profile first_name
 * @apiSuccess {String} profile.middle_name Profile middle_name
 * @apiSuccess {String} profile.last_name Profile last_name
 * @apiSuccess {String} profile.display_name Profile display name
 * @apiSuccess {Boolean} profile.is_public is public profile?
 * @apiSuccess {Date} profile.updated_at Update's date
 * @apiSuccess {Date} profile.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"display_name" : "Yido",
 *		"is_public" : false,
 *		"addresses" : [
 * 	    {
 *	    	"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *	    	"name" : "FBI Church",
 *	    	"picture" : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
 *	    	"is_main" : false,
 *	    	"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *	    	"loc" : {
 *		    	"lon" : -989.877,
 *		    	"lat" : -9943.0973
 *	    	}
 *	    	],
 * 	    	"__v" : 0,
 *	    	"last_modified" : ISODate("2017-05-05T10:15:40.128Z")
 *  	 }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:profileId', profile.getProfile);

/**
 * @api {get} /profile/search/:query Find Profiles
 * @apiGroup Profiles
 * @apiParam {String} query Profile query
 * @apiSuccess {Object[]} profile Profile's list
 * @apiSuccess {Number} profile.id Profile id
 * @apiSuccess {Object} user User User Profile
 * @apiSuccess {String} profile.first_name Profile first_name
 * @apiSuccess {String} profile.middle_name Profile middle_name
 * @apiSuccess {String} profile.last_name Profile last_name
 * @apiSuccess {String} profile.display_name Profile display name
 * @apiSuccess {Boolean} profile.is_public is public profile?
 * @apiSuccess {Date} profile.updated_at Update's date
 * @apiSuccess {Date} profile.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"display_name" : "Yido",
 *		"is_public" : false,
 *		"addresses" : [
 * 	    {
 *	    	"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *	    	"name" : "FBI Church",
 *	    	"picture" : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
 *	    	"is_main" : false,
 *	    	"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *	    	"loc" : {
 *		    	"lon" : -989.877,
 *		    	"lat" : -9943.0973
 *	    	}
 *	    	],
 * 	    	"__v" : 0,
 *	    	"last_modified" : ISODate("2017-05-05T10:15:40.128Z")
 *  	 }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/search/:query', profile.searchProfile);

/**
 * @api {get} /profile/profiles/:query Find addresses of a profile
 * @apiGroup Profiles
 * @apiParam {String} query Profile query
 * @apiSuccess {Object[]} address Address's list
 * @apiSuccess {Number} address.id Address id
 * @apiSuccess {String} address.name Address name
 * @apiSuccess {String} address.picture Address picture
 * @apiSuccess {Boolean} address.is_main is main address?
 * @apiSuccess {Object} owner Owner Profile
 * @apiSuccess {Object} loc geographical location
 * @apiSuccess {Date} address.updated_at Update's date
 * @apiSuccess {Date} address.created_at Register's date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 * 	  [{
 *		"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *		"name" : "FBI Church",
 *		"picture" : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
 *		"is_main" : false,
 *		"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"loc" : {
 *			"lon" : -989.877,
 *			"lat" : -9943.0973
 *		},
 *		"date_modified" : ISODate("2017-05-05T10:15:40.099Z"),
 *		"date_created" : ISODate("2017-05-05T10:15:40.099Z")
 *	   }]
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/profiles/:profileId', profile.getAddress);

/**
 * @api {post} /profile/add Register a new Profile to a user
 * @apiGroup Profiles
 * @apiParam {id} id user id
 * @apiParamExample {json} INPUT
 *   {
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"is_public" : false,
 *		"__v" : 0,
 *		"last_modified" : ISODate("2017-05-05T10:15:40.128Z")
 *	 }
 * @apiSuccess {Object[]} profile Profile's list
 * @apiSuccess {Number} profile.id Profile id
 * @apiSuccess {Object} user User User Profile
 * @apiSuccess {String} profile.first_name Profile first_name
 * @apiSuccess {String} profile.middle_name Profile middle_name
 * @apiSuccess {String} profile.last_name Profile last_name
 * @apiSuccess {String} profile.display_name Profile display name
 * @apiSuccess {Boolean} profile.is_public is public profile?
 * @apiSuccess {Date} profile.updated_at Update's date
 * @apiSuccess {Date} profile.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"display_name" : "Yido",
 *		"is_public" : false,
 *  	 }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/add/:userId', profile.addProfile);

/**
 * @api {put} /profile/:profileId Update an Profile
 * @apiGroup Profiles
 * @apiParam {id} id profile id
 * @apiParamExample {json} INPUT
 *   {
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"user" : ObjectId("590c20fb8eb7d442b8e7040b"),
 *		"first_name" : "Yididiya",
 *		"middle_name" : "Gebredingel",
 *		"last_name" : "Berhe",
 *		"is_public" : false,
 *		"__v" : 0,
 *		"last_modified" : ISODate("2017-05-05T10:15:40.128Z")
 *	 }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:profileId', profile.editProfile);

/**
 * @api {put} /profile/:profileId Set Profile picture
 * @apiGroup Profiles
 * @apiParam {id} id profile id
 * @apiParamExample {json} INPUT
 *   {
 *		"_id" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *		"picture" : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
 *	 }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:profileId', profile.setProfilePicture);



/**
 * @api {delete} /profile/:profileId Remove an profile
 * @apiGroup Profiles
 * @apiParam {id} id Profile id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:profileId', profile.deleteProfile);

//~ Export Router ~//
module.exports = router;
