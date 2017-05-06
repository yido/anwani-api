// Load Module Dependencies
var express   =   require('express');

var user  = require('../controllers/user');
var auth  = require('../controllers/auth');
var authorize = require('../lib/authorize');

// Create a Router
var router = express.Router();

// POST /users/signup
/**
 * @api {post} /users/signup New user sign up
 * @apiGroup Users
 *  @apiParamExample {json} Input
 *		 {
 *			"first_name" : "Yididiya",
 *			"middle_name" : "Gebredingel",
 *			"last_name" : "Berhe",
 *			"user_type" : "individual",
 *			"username" : "0910303229",
 *			"password" : "your password"
 *		}
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *		 {
 *			"_id" : ObjectId("590c4dadda53bd1db8c88ed1"),
 *			"password" : "$2a$07$1YbUkcZFXqL3m9XV6OdIcOUDfp4WPTh2EDCG7fgXMWPa6zff4bSiu",
 *			"username" : "0910303229",
 *			"user_type" : "individual",
 *			"last_modified" : ISODate("2017-05-05T10:18:25.546Z"),
 *			"date_created" : ISODate("2017-05-05T10:02:21.038Z"),
 *			"shared_addresses" : [],
 *			"status" : "active",
 *			"realm" : "user",
 *			"__v" : 0,
 *			"profile" :
 *			{
 *		        "_id": "590c4dadda53bd1db8c88ed2",
 *              "user": "590c4dadda53bd1db8c88ed1",
 *              "first_name": "Yared",
 *              "middle_name": "Dejene",
 *              "last_name": "Dessalegne",
 *              "__v": 0,
 *              "is_public": false,
 *              "addresses": []
 *			}
 *		}
 * @apiErrorExample {json} User is not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/signup', user.createUser);

// POST /users/login
/**
 * @api {post} /users/signup user sign in
 * @apiGroup Users
 *  @apiParamExample {json} Input
 *		 {
 *			"username" : "0910303229",
 *			"password" : "your password"
 *		}
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *		 {
 *			"_id" : ObjectId("590c4dadda53bd1db8c88ed1"),
 *			"password" : "$2a$07$1YbUkcZFXqL3m9XV6OdIcOUDfp4WPTh2EDCG7fgXMWPa6zff4bSiu",
 *			"username" : "0910303229",
 *			"user_type" : "individual",
 *			"last_modified" : ISODate("2017-05-05T10:18:25.546Z"),
 *			"date_created" : ISODate("2017-05-05T10:02:21.038Z"),
 *			"shared_addresses" : [],
 *			"status" : "active",
 *			"realm" : "user",
 *			"__v" : 0,
 *			"profile" :
 *			{
 *		        "_id": "590c4dadda53bd1db8c88ed2",
 *              "user": "590c4dadda53bd1db8c88ed1",
 *              "first_name": "Yared",
 *              "middle_name": "Dejene",
 *              "last_name": "Dessalegne",
 *              "__v": 0,
 *              "is_public": false,
 *              "addresses": []
 *			}
 *		}
 * @apiErrorExample {json} User is not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', auth.login);

// POST /users/logout
/**
 * @api {post} /users/logout Logout a user
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Logout error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/logout', auth.logout);

// GET /users/all
/**
 * @api {get} /users/all Get all Users
 * @apiGroup Users
 * @apiSuccess {Object} user User object
 * @apiSuccess {Number} user.id User id
 * @apiSuccess {Number} user.username User username
 * @apiSuccess {String} user.password User password
 * @apiSuccess {String} user.user_type User user_type
 * @apiSuccess {Object[]} shared_addresses shared addresses
 * @apiSuccess {Date} user.updated_at Update's date
 * @apiSuccess {Date} user.created_at Register's date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *		[ {
 *			"_id" : ObjectId("590c4dadda53bd1db8c88ed1"),
 *			"password" : "$2a$07$1YbUkcZFXqL3m9XV6OdIcOUDfp4WPTh2EDCG7fgXMWPa6zff4bSiu",
 *			"username" : "0910303229",
 *			"user_type" : "individual",
 *			"last_modified" : ISODate("2017-05-05T10:18:25.546Z"),
 *			"date_created" : ISODate("2017-05-05T10:02:21.038Z"),
 *			"shared_addresses" : [
 *				 {
 *				 		"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *				 		"name" : "FBI Church",
 *				 		"picture" : "OPHYTT87PQBEAPe",
 *				 		"is_main" : false,
 *				 		"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *				 		"loc" : {
 *				 			"lon" : -989.877,
 *				 			"lat" : -9943.0973
 *				 		},
 *				 		"date_modified" : ISODate("2017-05-05T10:15:40.099Z"),
 *				 		"date_created" : ISODate("2017-05-05T10:15:40.099Z")
 *			   }
 *			],
 *			"status" : "active",
 *			"realm" : "user",
 *			"__v" : 0,
 *			"profile" : ObjectId("590c4dadda53bd1db8c88ed2")
 *		}]
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/all', authorize(['admin']),  user.getAll);

// GET /users/:userId
/**
 * @api {get} /users/:userId Find a User
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccess {Object} user User object
 * @apiSuccess {Number} user.id User id
 * @apiSuccess {Number} user.username User username
 * @apiSuccess {String} user.password User password
 * @apiSuccess {String} user.user_type User user_type
 * @apiSuccess {Object[]} shared_addresses shared addresses
 * @apiSuccess {Date} user.updated_at Update's date
 * @apiSuccess {Date} user.created_at Register's date
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *		 {
 *			"_id" : ObjectId("590c4dadda53bd1db8c88ed1"),
 *			"password" : "$2a$07$1YbUkcZFXqL3m9XV6OdIcOUDfp4WPTh2EDCG7fgXMWPa6zff4bSiu",
 *			"username" : "0910303229",
 *			"user_type" : "individual",
 *			"last_modified" : ISODate("2017-05-05T10:18:25.546Z"),
 *			"date_created" : ISODate("2017-05-05T10:02:21.038Z"),
 *			"shared_addresses" : [
 *				 {
 *				 		"_id" : ObjectId("590c50cc3e981c4688fe0202"),
 *				 		"name" : "FBI Church",
 *				 		"picture" : "OPHYTT87PQBEAPe",
 *				 		"is_main" : false,
 *				 		"owner" : ObjectId("590c20fb8eb7d442b8e7040c"),
 *				 		"loc" : {
 *				 			"lon" : -989.877,
 *				 			"lat" : -9943.0973
 *				 		},
 *				 		"date_modified" : ISODate("2017-05-05T10:15:40.099Z"),
 *				 		"date_created" : ISODate("2017-05-05T10:15:40.099Z")
 *			   }
 *			],
 *			"status" : "active",
 *			"realm" : "user",
 *			"__v" : 0,
 *			"profile" : ObjectId("590c4dadda53bd1db8c88ed2")
 *		}
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:userId', user.getUser);

// PUT /users/:userId
/**
 * @api {put} /users/:userId Update a User
 * @apiGroup Users
 * @apiParam {id} id user id
 *  @apiParamExample {json} Input
 *		 {
 *			"_id" : ObjectId("590c4dadda53bd1db8c88ed1"),
 *			"password" : "$2a$07$1YbUkcZFXqL3m9XV6OdIcOUDfp4WPTh2EDCG7fgXMWPa6zff4bSiu",
 *			"username" : "0910303229",
 *			"user_type" : "individual",
 *			"last_modified" : ISODate("2017-05-05T10:18:25.546Z"),
 *			"date_created" : ISODate("2017-05-05T10:02:21.038Z"),
 *			"status" : "active",
 *			"realm" : "user",
 *			"__v" : 0,
 *			"profile" : ObjectId("590c4dadda53bd1db8c88ed2")
 *		}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:userId', user.editUser);

// DELETE /users/:userId
/**
 * @api {delete} /users/:userId Remove a user
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:userId', user.deleteUser);

// Export Router
module.exports = router;

