const friendController = require("../controllers/friendController")
const ListController = require("../controllers/listController")
const ItemController = require("../controllers/itemController")
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;


    app.get(`${baseUrl}/friend/getAllFriendList`, auth.isAuthorized, friendController.getAllFriendList);
    /**
     * @api {get} /api/v1/friend/getAllFriendList Get array of friendList
     * @apiVersion 1.0.0
     * @apiGroup Friend
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Watchers Found",
            "status":200,
            "data":[ {
                    "userId": "SIpbjGUsh",
                    "userName": "ojas modi",
                    "issueId": "mbsGbDfrT"
                },
                {
                    "userId": "pkWsDktY4",
                    "userName": "xyxz Modi",
                    "issueId": "mbsGbDfrT"
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/list/getAllList/:userId`, auth.isAuthorized, ListController.getAllLists)
    /**
     * @api {get} /api/v1/issue/getallWatchers/:issueId Get All watchers on Issue
     * @apiVersion 1.0.0
     * @apiGroup Watchlist
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Watchers Found",
            "status":200,
            "data":[ {
                    "userId": "SIpbjGUsh",
                    "userName": "ojas modi",
                    "issueId": "mbsGbDfrT"
                },
                {
                    "userId": "pkWsDktY4",
                    "userName": "xyxz Modi",
                    "issueId": "mbsGbDfrT"
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/item/getAllItems`,auth.isAuthorized, ItemController.getAllItems)
    /**
     * @api {get} /api/v1/issue/getallWatchers/:issueId Get All watchers on Issue
     * @apiVersion 1.0.0
     * @apiGroup Watchlist
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Watchers Found",
            "status":200,
            "data":[ {
                    "userId": "SIpbjGUsh",
                    "userName": "ojas modi",
                    "issueId": "mbsGbDfrT"
                },
                {
                    "userId": "pkWsDktY4",
                    "userName": "xyxz Modi",
                    "issueId": "mbsGbDfrT"
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

}