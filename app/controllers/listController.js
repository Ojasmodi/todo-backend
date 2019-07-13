const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')
const ItemModel = mongoose.model('Item')
const ListModel = mongoose.model('List')
const UserModel = mongoose.model('User')

let getAllLists = (req, res) => {

    ListModel.find({ 'listCreatorId': req.params.userId })
        .select()
        .lean()
        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'List Controller: findLists', 10)
                let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'List  Controller:findLists')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'All lists found', 200, ListDetails)
                res.send(apiResponse)
            }
        })
}// end getAllListsFunction 

let getListById = (req, res) => {
    ListModel.findOne({ 'listId': req.params.listId })
        .select()
        .lean()
        .exec((err, ListDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'List Controller: getListDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Lists', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(ListDetails)) {
                logger.info('No List Found', 'List  Controller:getListDetailsFunction')
                let apiResponse = response.generate(true, 'No List Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'List Found', 200, ListDetails)
                res.send(apiResponse)
            }
        })
}// end getListDetailsFunction

let deleteList = (data, cb) => {

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
    }// end validate user input

    let deleteList = () => {
        return new Promise((resolve, reject) => {

            ListModel.findOneAndRemove({ 'listId': data.listId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'List Controller: deleteList', 10)
                    let apiResponse = response.generate(true, 'Failed To delete List', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'List Controller: deleteList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {                  
                    let apiResponse = response.generate(false, 'Deleted the List successfully', 200, result)
                    resolve(apiResponse)
                }
            });// end List model find and remove

        })
    }// end deleteList function

    findListDetails(data).
        then(deleteList)
        .then((resolve) => {
            //let apiResponse = response.generate(false, 'Deleted the List successfully', 200, resolve)
            cb(null, resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err, null)
        })

}// end deleteListFunction 


let updateList = (data, cb) => {

    let findListDetails = () => {
        return new Promise((resolve, reject) => {
            ListModel.findOne({ 'listId':data.listId })
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

    let updateList = () => {
        return new Promise((resolve, reject) => {
            data.listModifiedOn = time.now()
            
            ListModel.update({ 'listId': data.listId }, data).exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'List Controller:updateList', 10)
                    let apiResponse = response.generate(true, 'Failed To Update List details', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No List Found', 'List Controller:updateList')
                    let apiResponse = response.generate(true, 'No List Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'List details Updated', 200, result)
                    resolve(apiResponse)
                }
            });// end List model update

        })
    }// end updateList function


    findListDetails()
        .then(updateList)
        .then((resolve) => {
          cb(null,resolve)
        })
        .catch((err) => {
            console.log(err);
            cb(err,null)
        })

}// end updateListFunction 


let addList = (data,cb) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (data.listName && data.listCreatorId && data.listCreatorName) {
                resolve(data)
            } else {
                logger.error('Field Missing During List Creation', 'ListController: addList()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input 

    let addList = (data) => {
        return new Promise((resolve, reject) => {
            //console.log(req.body)
            let newList = new ListModel({
                listId: shortid.generate(),
                listName: data.listName,
                listCreatorId: data.listCreatorId,
                listCreatorName: data.listCreatorName,
                //listModifierId: data.listModifierId,
                //listModifierName: data.listModifierName,
            })
            newList.save((err, newList) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'ListController: addList', 10)
                    let apiResponse = response.generate(true, 'Failed to add new List', 500, null)
                    reject(apiResponse)
                } else {
                    let newListObj = newList.toObject();
                    resolve(newListObj)
                }
            })

        })
    }// end addList function


    validateUserInput(data)
        .then(addList)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'List Created successfully.', 200, resolve)
            cb(null, apiResponse)
        })
        .catch((err) => {
            console.log(err);
            cb(err,null)
        })

}// end addListFunction 



module.exports = {
    addList: addList,
    updateList: updateList,
    deleteList: deleteList,
    getAllLists: getAllLists,
    getListById: getListById
}// end exports