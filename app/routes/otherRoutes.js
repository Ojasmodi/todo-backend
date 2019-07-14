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
    "error": false,
    "message": "All Friend List Found",
    "status": 200,
    "data": [
        {
            "FriendListId": "bZHCnZtY7",
            "createdOn": "2019-07-10T16:13:17.569Z",
            "status": "friend",
            "user2Name": "xyz xyz",
            "user2Id": "X5RI-Yxvd",
            "user1Name": "abc abcd",
            "user1Id": "6rC3xVs-h"
        },
        {
            "FriendListId": "Hclu6yD7p",
            "createdOn": "2019-07-07T16:20:20.872Z",
            "status": "request",
            "user2Name": "ffhhj",
            "user2Id": "EGJXNofn_",
            "user1Name": "ugh gvh",
            "user1Id": "X5RI-Yxvd"
        }
    ]
    }
    @apiErrorExample {json} Error-Response:
     *
     * {
        "error": true,
        "message": "Error mesage",
        "status": 500/404,
        "data": null
       }
    */

    app.get(`${baseUrl}/list/getAllList/:userId`, auth.isAuthorized, ListController.getAllLists)
    /**
     * @api {get} /api/v1/list/getAllList/:userId Get All todo lists
     * @apiVersion 1.0.0
     * @apiGroup List
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} userId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "All lists found",
    "status": 200,
    "data": [
        {
            "_id": "5d2ad7550dfd263b54d7e2dd",
            "__v": 0,
            "listModifiedOn": "2019-07-07T07:18:29.626Z",
            "listCreatedOn": "2019-07-06T07:16:34.342Z",
            "listBelongsTo": "X5RI-Yxvd",
            "listModifierName": "",
            "listModifierId": "",
            "listCreatorName": "abc abds",
            "listCreatorId": "X5RI-Yxvd",
            "listName": "ghhhhh",
            "listId": "hHeDtFY_O"
        }
    ]
}
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error message",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/item/getAllItems`, auth.isAuthorized, ItemController.getAllItems)
    /**
     * @api {get} /api/v1/item/getAllItems Get All tems with their subitems 
     * @apiVersion 1.0.0
     * @apiGroup item
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
    "error": false,
    "message": "Items Found and Listed",
    "status": 200,
    "data": [
        {
            "_id": "5d2ad75b0dfd263b54d7e2de",
            "__v": 0,
            "subItems": [
                {
                    "subItemId": "WqqfYvsNE",
                    "subItemName": "mmm",
                    "parentItemId": "q23rURnpu",
                    "subItemBelongsTo": "X5RI-Yxvd",
                    "subItemCreatorId": "X5RI-Yxvd",
                    "subItemCreatorName": "sdf ghj",
                    "subItemCreatedOn": "2019-07-04T05:18:56.000Z",
                    "subItemModifiedOn": "2019-07-03T07:12:42.005Z",
                    "subItemModifierId": "X5RI-Yxvd",
                    "subItemModifierName": "abcd abcd",
                    "subItemDone": "done",
                    "_id": "5d2ad7830dfd263b54d7e2e3"
                },
            ],
            "itemDone": "open",
            "itemBelongsTo": "X5RI-Yxvd",
            "itemModifierName": "",
            "itemModifierId": "",
            "itemModifiedOn": "2019-07-06T12:07:10.000Z",
            "itemCreatedOn": "2019-07-04T11:18:29.621Z",
            "itemCreatorName": "dfg hjk",
            "itemCreatorId": "X5RI-Yxvd",
            "itemName": "oo",
            "itemId": "q23rURnpu",
            "listId": "hHeDtFY_O"
        },
    ]
}
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error message",
	    "status": 500/404,
	    "data": null
	   }
    */

}