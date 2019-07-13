const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

/* Models */
const ItemModel = mongoose.model('Item')
const ListModel = mongoose.model('List')


/* Start getAllItemsFunction */
/* params: listId
*/

let getAllItems = (req, res) => {

    ItemModel.find()
        .select()
        .lean()
        .exec((err, ItemDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Item Controller: findItems', 10)
                let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ItemDetails)) {
                logger.info('No Item Found', 'Item  Controller:findItems')
                let apiResponse = response.generate(true, 'No Item Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Items Found and Listed', 200, ItemDetails)
                res.send(apiResponse)
            }
        })

}// end getAllItemsFunction 


/*  Start getItemDetailsFunction */
/* params : ItemId
*/
let getItemDetails = (req, res) => {
    ItemModel.findOne({ 'itemId': req.params.itemId })
        .select()
        .lean()
        .exec((err, ItemDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Item Controller: getItemDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Items', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ItemDetails)) {
                logger.info('No Item Found', 'Item  Controller:getItemDetailsFunction')
                let apiResponse = response.generate(true, 'No Item Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Item Found', 200, ItemDetails)
                res.send(apiResponse)
            }
        })
}// end getItemDetailsFunction


/* Start Delete Item  */
/* params : ItemId
*/
let deleteItem = (data, cb) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': data.listId })
                .select()
                .lean()
                .exec((err, ListDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'List Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ListDetails)) {
                        logger.info('No List Found', 'List  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findListdetails

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end validate list input

    let deleteItem = () => {
        return new Promise((resolve, reject) => {

            ItemModel.findOneAndRemove({ 'itemId': data.itemId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller: deleteItem', 10)
                    let apiResponse = response.generate(true, 'Failed To delete Item', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller: deleteItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Deleted the Item successfully', 200, result)
                    resolve(apiResponse)
                }
            });// end Item model find and remove

        })
    }// end deleteItem function

    findListDetails()
        .then(findItemDetails)
        .then(deleteItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Deleted the Item successfully', 200, resolve)
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end deleteItemFunction 


/* Start Update Item details */
/* params: ItemId
   body : ItemName,ItemMode,ItemModifierId,ItemModifierName
*/

let updateItem = (data, cb) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': data.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findListDetails

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findItemdetails 

    let updateItem = () => {
        return new Promise((resolve, reject) => {

            let options = data;
            options.itemModifiedOn = time.now()

            ItemModel.update({ 'itemId': data.itemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Item details Updated', 200, null)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function

    findListDetails()
        .then(findItemDetails)
        .then(updateItem)
        .then((resolve) => {
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end updateItemFunction 


// start addItemFunction 
/* params: listId,ItemName,ItemCreatorId,ItemCreatorName,ItemModifierId,ItemModifierName
           
*/


let addItem = (data, cb) => {

    let validatelistInput = (data) => {
        return new Promise((resolve, reject) => {
            if (data.listId && data.itemName && data.itemCreatorId && data.itemCreatorName) {
                resolve(data)
            } else {
                logger.error('Field Missing During Item Creation', 'ItemController: addItem()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate list input

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': data.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findListDetails

    let addItem = () => {
        return new Promise((resolve, reject) => {
            //console.log(req.body)
            let newItem = new ItemModel({

                listId: data.listId,
                itemName: data.itemName,
                itemId: shortid.generate(),
                itemCreatorId: data.itemCreatorId,
                itemCreatorName: data.itemCreatorName,
                // itemModifierId: req.body.itemModifierId,
                // itemModifierName: req.body.itemModifierName,
                // itemCreatedOn: time.now(),
                // itemModifiedOn: time.now(),
            })

            //console.log(newItem)
            newItem.save((err, newItem) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'ItemController: addItem', 10)
                    let apiResponse = response.generate(true, 'Failed to add new Item', 500, null)
                    reject(apiResponse)
                } else {
                    let newItemObj = newItem.toObject();
                    resolve(newItemObj)
                }
            })

        })
    }// end addItem function


    validatelistInput(data)
        .then(findListDetails)
        .then(addItem)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Item Created', 200, resolve)
            cb(null, apiResponse)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end addItemFunction 


/* Start getSubItemDetailsFunction */
/* params: itemId */
/* body params: subItemId */


let getSubItemDetails = (data, cb) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Item Details Found', 200, ItemDetails)
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails 


    let findSubItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.find({ "subItems": { $elemMatch: { subItemId: data.subItemId } } })
                .select('subItems')
                .lean()
                .exec((err, SubItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findSubItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Sub Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(SubItemDetails)) {
                        logger.info('No Sub Item Found', 'Item  Controller:findSubItemDetails')
                        let apiResponse = response.generate(true, 'No Sub Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        let apiResponse = response.generate(false, 'Sub Item Details Found', 200, SubItemDetails)
                        resolve(apiResponse)
                    }
                })

        })
    }// end findSubItemDetails function


    findItemDetails(req, res)
        .then(findSubItemDetails)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end getSubItemDetailsFunction 


/* Start addSubItemFunction */
/* params: ItemId
   body : subItemName,subItemModifierId,subItemModifierName,subItemCreatorId,subItemCreatorName
*/

let addSubItem = (data, cb) => {

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findItemdetails

    let updateItem = () => {
        return new Promise((resolve, reject) => {

            let subOptions = {
                subItemId: shortid.generate(),
                subItemName: data.subItemName,
                subItemCreatorId: data.subItemCreatorId,
                subItemCreatorName: data.subItemCreatorName,
                subItemDone:'open',
                // subItemModifierId: data.subItemModifierId,
                // subItemModifierName: req.body.subItemModifierName,
                subItemCreatedOn: time.now(),
                subItemModifiedOn: time.now(),
            }
            //To add the subitem in item model we will use push method of array

            let options = {
                $push: {
                    subItems: {
                        $each: [subOptions]
                    }
                }
            }


            options.itemModifiedOn = time.now()
            // options.itemModifierId = req.body.subItemModifierId,
            //     options.itemModifierName = req.body.subItemModifierName,


            ItemModel.update({ 'itemId': data.itemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateSubItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Adding', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateSubItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {

                    let apiResponse = response.generate(false, 'Item details Updated : Sub Item Added', 200, subOptions)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function


    findItemDetails()
        .then(updateItem)
        .then((resolve) => {
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end addSubItemFunction 


/* Start deleteSubItemFunction */
/* params: ItemId,subItemId,
   Body:    itemModifierId                 
            itemModifierName

*/

let deleteSubItem = (data, cb) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': data.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findListDetails

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(ItemDetails)
                    }
                })
        })
    }// end findItemdetails

    let updateItem = () => {
        return new Promise((resolve, reject) => {

            //To delete the subitem from item model we will use pull method of array

            let options = {
                $pull: {
                    subItems: {
                        subItemId: data.subItemId
                    }
                }
            }

            options.itemModifiedOn = time.now()
            // options.itemModifierId = req.body.subItemModifierId,
            //     options.itemModifierName = req.body.subItemModifierName,


            ItemModel.update({ 'itemId': data.itemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateSubItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Deleting', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateSubItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Item details Updated : Sub Item Deleted', 200, result)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function

    findListDetails()
        .then(findItemDetails)
        .then(updateItem)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Item Updated', 200, "None")
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end deleteSubItemFunction 


/* Start Update Sub Item */
/* params: ItemId,subItemId
   body : subItemName,subItemMode,subItemModifierId,subItemModifierName,subItemDone
*/

let updateSubItem = (data, cb) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId': data.listId })
                .select()
                .lean()
                .exec((err, listDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findListDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find List Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(listDetails)) {
                        logger.info('No List Found', 'Item  Controller:findListDetails')
                        let apiResponse = response.generate(true, 'No List Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findListDetails

    let findItemDetails = () => {
        return new Promise((resolve, reject) => {
            ItemModel.findOne({ 'itemId': data.itemId })
                .select()
                .lean()
                .exec((err, ItemDetails) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'Item Controller: findItemDetails', 10)
                        let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(ItemDetails)) {
                        logger.info('No Item Found', 'Item  Controller:findItemDetails')
                        let apiResponse = response.generate(true, 'No Item Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve()
                    }
                })
        })
    }// end findItemdetails

    let updateItem = () => {
        return new Promise((resolve, reject) => {

            //To update the subitem in item model we will use set method of array
            let options = {
                $set: {
                    "subItems.$.subItemName": data.subItemName,
                    "subItems.$.subItemModifierId": data.subItemModifierId,
                    "subItems.$.subItemModifierName": data.subItemModifierName,
                    "subItems.$.subItemDone": data.subItemDone,
                    "subItems.$.subItemModifiedOn": time.now(),
                }
            }


            options.itemModifiedOn = time.now()
            // options.itemModifierId = req.body.subItemModifierId,
            // options.itemModifierName = req.body.subItemModifierName

            ItemModel.update({ 'itemId': data.itemId, 'subItems.subItemId': data.subItemId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Item Controller:updateItem', 10)
                    let apiResponse = response.generate(true, 'Failed To Update Item details : Sub Item Updating', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Item Found', 'Item Controller:updateItem')
                    let apiResponse = response.generate(true, 'No Item Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Item details Updated : Sub Item Updated', 200, result)
                    resolve(apiResponse)
                }
            });// end Item model update

        })
    }// end updateItem function


    findListDetails()
        .then(findItemDetails)
        .then(updateItem)
        .then((resolve) => {
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end updateSubItemFunction 



module.exports = {
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    getAllItems: getAllItems,
    getItemDetails: getItemDetails,
    addSubItem: addSubItem,
    deleteSubItem: deleteSubItem,
    updateSubItem: updateSubItem,
    getSubItemDetails: getSubItemDetails

}// end exports