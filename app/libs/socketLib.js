const socketio = require('socket.io')
const friendController = require('./../controllers/friendController')
const tokenLib = require("./tokenLib.js");
const listController = require("./../controllers/listController")
const itemController = require("./../controllers/itemController")
const historyController = require("./../controllers/historyController")

let setServer = (server) => {

    let io = socketio.listen(server)

    let myIO = io.of('')

    myIO.on('connection', (socket) => {

        console.log("on emitting verifying user");

        socket.emit('verifyUser', "");

        //code to verify user
        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {

                if (err) {
                    socket.emit('auth-error', { status: 500, error: true, errorMsg: "Plz provide data with authToken" })
                }
                else {

                    console.log("user is verified setting details")
                    let currentUser = user.data;
                    //setting socket userId
                    socket.userId = currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);

                    socket.room = 'issue'
                    socket.join(socket.room)
                }
            })

        })

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            console.log(socket.userId);
            socket.leave(socket.room)
            socket.emit('connection-lost', '');


        }) // end of on disconnect

        // event to creating list
        socket.on('create-list', (data) => {          
            listController.addList(data, (err, result) => {
                if (err) {
                    err.listCreatorId= data.listCreatorId;
                    myIO.in(socket.room).emit('new-created-list', err);
                }
                else {
                    myIO.in(socket.room).emit('new-created-list', result);
                }
            });
        }) 
        
        // event to creating item
        socket.on('create-item', (data) => {
            
            itemController.addItem(data, (err, result) => {
                if (err) {
                    err.listCreatorId= data.listCreatorId;
                    myIO.in(socket.room).emit('new-created-item', err);
                }
                else {
                    result.data.listId=data.listId
                    //console.log(result)
                    myIO.in(socket.room).emit('new-created-item', result);
                }
            });
        })
        
        // event for creating subitem
        socket.on('create-subitem', (data) => {
            
            itemController.addSubItem(data, (err, result) => {
                if (err) {
                    err.subItemCreatorId = data.subItemCreatorId;
                    myIO.in(socket.room).emit('new-created-subitem', err);
                }
                else {
                    result.data.itemId=data.itemId;
                    console.log(result)
                    myIO.in(socket.room).emit('new-created-subitem', result);
                }
            });
        })

        // event for updating list
        socket.on('update-list', (data) => {
            
            listController.updateList(data, (err, result) => {
                if (err) {
                    err.listCreatorId= data.listCreatorId;
                    sockmyIO.in(socket.room).emit('updated-list', err);
                }
                else {
                    result.data=data
                    console.log(result)
                    myIO.in(socket.room).emit('updated-list', result);
                }
            });
        })

        // event to delete list
        socket.on('delete-list', (data) => {
            
            listController.deleteList(data, (err, result) => {
                if (err) {
                    err.deletedBy= data.deletedBy;
                    myIO.in(socket.room).emit('deleted-list', err);
                }
                else {
                    result.deletedBy=data.deletedBy;
                    console.log(result)
                    myIO.in(socket.room).emit('deleted-list', result);
                }
            });
        })

        // event for updating item
        socket.on('update-item', (data) => {
            
            itemController.updateItem(data, (err, result) => {
                if (err) {
                    err.listCreatorId= data.listCreatorId;
                    myIO.in(socket.room).emit('updated-item', err);
                }
                else {
                    result.data=data
                    console.log(result)
                    myIO.in(socket.room).emit('updated-item', result);
                }
            });
        })

        // event for updating subitem
        socket.on('update-subitem', (data) => {
            console.log(data)
            itemController.updateSubItem(data, (err, result) => {
                if (err) {
                    err.listCreatorId= data.listCreatorId;
                    myIO.in(socket.room).emit('updated-subitem', err);
                }
                else {
                    result.data=data
                    console.log(result)
                    myIO.in(socket.room).emit('updated-subitem', result);
                }
            });
        })

        // event for deleting item
        socket.on('delete-item', (data) => {
            
            itemController.deleteItem(data, (err, result) => {
                if (err) {
                    err.deletedBy= data.deletedBy;
                    myIO.in(socket.room).emit('deleted-item', err);
                }
                else {
                    result.deletedBy=data.deletedBy
                    console.log(result)
                    myIO.in(socket.room).emit('deleted-item', result);
                }
            });
        })

        // event for deleting subitem
        socket.on('delete-subitem', (data) => {
            
            itemController.deleteSubItem(data, (err, result) => {
                if (err) {
                    err.deletedBy= data.deletedBy;
                    myIO.in(socket.room).emit('deleted-subitem', err);
                }
                else {
                    result.data=data.subItem;
                    result.deletedBy=data.deletedBy
                    console.log(result)
                    myIO.in(socket.room).emit('deleted-subitem', result);
                }
            });
        })
        
        // event for undo action
        socket.on('undo', (data) => {
            
            historyController.getHistory(data, (err, result) => {
                if (err) {
                    err.data={}
                    err.data.changeDoneById=data.userId;
                    err.data.changeDoneByName=data.userName;
                    //console.log(err)
                    myIO.in(socket.room).emit('undo-error', err);
                }
                else {
                    result.data.undo=true;
                    result.data.changeDoneById=data.userId;
                    result.data.changeDoneByName=data.userName;
                    //console.log(result)
                    if(result.message=='list'){
                        myIO.in(socket.room).emit('new-created-list', result);
                    }
                    else if(result.message=='item'){
                        myIO.in(socket.room).emit('new-created-item', result); 
                    }
                    else{
                        myIO.in(socket.room).emit('new-created-subitem', result);
                    }
                }
            });
        })

        socket.on('send-request', (data) => {
            console.log(data)
            friendController.sendFriendRequest(data, (err, result) => {
                if (err) {
                    console.log(err)
                    //err.assignedById = data.assignedById;
                    myIO.in(socket.room).emit('deleted-friend', err);
                }
                else {
                    console.log("send request done",result)
                    myIO.in(socket.room).emit('new-friend-request', result);
                }
            });
        }) // end of send-request

        socket.on('accept-request', (info) => {
            console.log(info)
            friendController.acceptRequest(info, (err, result) => {
                if (err) {
                    console.log(err)
                    myIO.in(socket.room).emit('new-friend', err);
                }
                else {
                    result.data = info
                    console.log(result)
                    myIO.in(socket.room).emit('new-friend', result);
                }
            });
        }) // end of accept-request

    });
}

module.exports = {
    setServer: setServer
}


