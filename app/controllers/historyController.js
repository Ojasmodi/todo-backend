const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')
const shortid = require('shortid');
const time = require('../libs/timeLib');

/* Models */
const HistoryModel = mongoose.model('History')
const ListModel = mongoose.model('List')
const ItemModel = mongoose.model('Item')


let addHistory = (data, cb) => {

    let newHistory = new HistoryModel({
        historyId: shortid.generate(),
        createdOn: time.now(),
    })

    if (data.type == 'list') {
        newHistory.type = 'list'
        newHistory.history = data.list
        newHistory.historyCreatorId = data.list.listBelongsTo
    }

    newHistory.save((err, newItem) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'HistoryController: addHistory', 10)
            cb(err, null)
        } else {
            let newItemObj = newItem.toObject();
            cb(null, newItemObj)
        }
    })

}// end addHistory Function 

let getHistory = (data, cb) => {

    HistoryModel.findOneAndRemove({ 'historyCreatorId': data.userId })
        .sort({ $natural: -1 })
        .select()
        .lean()
        .exec((err, HistoryDetails) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'History Controller: v', 10)
                let apiResponse = response.generate(true, 'Failed To Find Item Details', 500, null)
                cb(apiResponse,null)
            } else if (check.isEmpty(HistoryDetails)) {
                logger.info('No Histroy Found', 'History  Controller:findHistory')
                let apiResponse = response.generate(true, 'No more undo actions', 404, null)
                cb(apiResponse, null)
            } else {
                if (HistoryDetails.type == 'list') {
                    let newList = new ListModel(HistoryDetails.history)
                    newList.save((err, result) => {
                        
                        let apiResponse = response.generate(false, 'list', 200, HistoryDetails.history)
                        //deleteHistoryFunction(HistoryDetails.historyId)
                        cb(null, apiResponse)
                    })
                }
                else if (HistoryDetails.type == 'item') {
                    let newItem = new ItemModel(HistoryDetails.history)
                    newItem.save((err, result) => {
                       
                        let apiResponse = response.generate(false, 'item', 200, HistoryDetails.history)
                        //deleteHistoryFunction(HistoryDetails.historyId)
                        cb(null, apiResponse)
                    })
                }
                else {
                    let options = {
                        $push: {
                            subItems: {
                                $each: [HistoryDetails.history]
                            }
                        }
                    }
                    ItemModel.update({ 'itemId': HistoryDetails.history.parentItemId }, options).exec((err, result) => {
                        
                        let apiResponse = response.generate(false, 'subItem', 200, HistoryDetails.history)
                        //deleteHistoryFunction(HistoryDetails.historyId)
                        cb(null, apiResponse)
                    });// end Item model update

                }
            }
        })

}// end getHistory Function 

module.exports = {
    addHistory: addHistory,
    getHistory: getHistory
}// end exports