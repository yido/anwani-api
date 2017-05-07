/**
 * Created by Yido on 2/25/2017.
 */
//~ Load Module Dependencies ~//
var express   =   require('express');

var address  = require('../controllers/address');

// Create a Router
var router = express.Router();


/**
 * @api {get} /address/all List all Addresss
 * @apiGroup Address
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
router.get('/all', address.getAll);

/**
 * @api {get} /address/:addressId Find an Address
 * @apiGroup Address
 * @apiParam {id} id Address id
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:addressId', address.getAddress);

/**
 * @api {get} /address/search/:query Find Addresss
 * @apiGroup Address
 * @apiParam {String} query Address query
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/search/:query', address.searchAddress);

/**
 * @api {get} /address/:userId Find Addresss by User
 * @apiGroup Address
 * @apiParam {id} id User id
 * @apiSuccess {Object[]} address Address's list
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/byUser/:userId', address.getAddressByUser);

/**
 * @api {get} /address/acquired/:userId Find Shared Addresses by User
 * @apiGroup Address
 * @apiParam {id} id User id
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/acquired/:userId', address.getSharedAddressByUser);

/**
 * @api {post} /address/add Register a new Address
 * @apiGroup Address
 * @apiParamExample {json} Input
 *  {
 *  	"_id" : ObjectId("590c4a092ead2c34acf94356"),
 *		"name" : "office",
 *		"picture" : "UIUR0lGODlhPQBEAPe",
 *		"date_modified" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"date_created" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"is_main" : true,
 *		"loc" : {
 *			"lon" : -349.877,
 *			"lat" : 123.0973
 *		},
 *		"__v" : 0
 *	}
 * @apiSuccess {Object} address Address object
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/add/:profileId', address.addAddress);


/**
 * @api {post} /address/add Register a new Address
 * @apiGroup Address
 * @apiParamExample {json} Input
 *  {
 *  	"_id" : ObjectId("590c4a092ead2c34acf94356"),
 *		"name" : "office",
 *		"picture" : "UIUR0lGODlhPQBEAPe",
 *		"date_modified" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"date_created" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"is_main" : true,
 *		"loc" : {
 *			"lon" : -349.877,
 *			"lat" : 123.0973
 *		},
 *		"__v" : 0
 *	}
 * @apiSuccess {Object} address Address object
 * @apiSuccess {Object} address Address object
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
 * 	  {
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
 *	   }
 * @apiErrorExample {json} Address not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/share/:addressId/:userId', address.shareAddress);

/**
 * @api {delete} /address/removeShared/:addressId Remove a shared address
 * @apiGroup Address
 * @apiParam {id} id Address id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/removeShared/:addressId', address.removeSharedAddress);


/**
 * @api {put} /address/ Update an Address
 * @apiGroup Address
 * @apiParam {id} id address id
 * @apiParamExample {json} Input
 *  {
 *  	"_id" : ObjectId("590c4a092ead2c34acf94356"),
 *		"name" : "office",
 *		"picture" : "UIUR0lGODlhPQBEAPe",
 *		"date_modified" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"date_created" : ISODate("2017-05-05T09:46:49.025Z"),
 *		"is_main" : true,
 *		"loc" : {
 *			"lon" : -349.877,
 *			"lat" : 123.0973
 *		},
 *		"__v" : 0
 *	}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/edit', address.editAddress);

/**
 * @api {delete} /address/:addressId Remove an address
 * @apiGroup Address
 * @apiParam {id} id Address id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:addressId', address.deleteAddress);



// Export Router
module.exports = router;
