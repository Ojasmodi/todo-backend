const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');
const check = require('../libs/checkLib');
const FriendListModel = mongoose.model('FriendList');

// updateFriendRequest
let sendFriendRequest = (data, cb) => {

    let validateInput = (data) => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(data)) {
                logger.info('data missing', 'sendFriendRequest: validateInput handler', 9)
                let apiResponse = response.generate(true, 'data missing.', 403, null)
                reject(apiResponse)
            } else {
                resolve(data)
            }
        });
    }; // end of validateInput

    let saveRequest = (data) => {
        return new Promise((resolve, reject) => {

            let FriendList = new FriendListModel({
                FriendListId: shortid.generate(),
                user1Id: data.user1Id,
                user1Name: data.user1Name,
                user2Id: data.user2Id,
                user2Name: data.user2Name,
            })
            FriendList.save((err, data) => {
                if (err) {
                    logger.error(err.message, 'Friend Controller->saveRequest', 10)
                    let apiResponse = response.generate(true, 'Error occured', 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info('Request edited successfully', 'Friend Controller->saveRequest', 5);
                    resolve(data);
                }
            })
        });
    };

    validateInput(data).then(saveRequest).then((resolve) => {
        let apiResponse = response.generate(false, 'Request saved successfully', 200, resolve);
        cb(null, apiResponse)
    })
        .catch((err) => {
            let apiResponse = response.generate(false, 'Request saved successfully', 200, err);
            cb(err, apiResponse)
        });
} // end of sendFriendRequest Function

let acceptRequest = (data, cb) => {

    FriendListModel.update({ 'FriendListId': data.FriendListId }, { status: 'friend' }).exec((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Server internal error', 500, null);
            logger.error(err.message, 'Training Controller:editTrainer', 10)
            cb(apiResponse, null)
        }
        else if(check.isEmpty(result)){
            let apiResponse = response.generate(true, 'No record found', 400,null);
            cb( apiResponse,null)
        } else {
            let apiResponse = response.generate(false, 'Request updated successfully', 200, result);
            cb(null, apiResponse)
        }
    });
} // end of acceptRequest Function

let getAllFriendList = (req, res) => {
    FriendListModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Friend Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Friend list Found', 'Friend Controller: getAllriend')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Friend List Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end of getAllFriendList Function

module.exports = {
    sendFriendRequest: sendFriendRequest,
    getAllFriendList: getAllFriendList,
    acceptRequest: acceptRequest
};