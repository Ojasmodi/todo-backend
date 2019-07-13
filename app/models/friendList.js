const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FriendList = new Schema({
    FriendListId: {
        type: String,
        index: true,
        unique: true
    },
    user1Id: {
        type: String,
        default: ''
    },
    user1Name: {
        type: String,
        default: ''
    },
    user2Id: {
        type: String,
        default: ''
    },
    user2Name: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'request'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('FriendList', FriendList);