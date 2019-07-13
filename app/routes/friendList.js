const friendController = require("./../../app/controllers/friendController")
const ListController = require("./../../app/controllers/listController")
const ItemController = require("./../../app/controllers/itemController")
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;


    app.get(`${baseUrl}/friend/getAllFriendList`, friendController.getAllFriendList);

    app.get(`${baseUrl}/list/getAllList/:userId`, ListController.getAllLists)

    app.get(`${baseUrl}/item/getAllItems`, ItemController.getAllItems)
}