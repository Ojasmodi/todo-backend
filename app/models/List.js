const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let ListSchema = new Schema({

  listId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },

  listName: {
    type: String,
    default: ''
  },

  listCreatorId: {
    type: String,
    default: ''
  },
  listCreatorName: {
    type: String,
    default: ''
  },
  
  listModifierId: {
    type: String,
    default: ''
  },
  listModifierName: {
    type: String,
    default: ''
  },

  listBelongsTo: {
    type: String,
    default: ''
  },

  listCreatedOn :{
    type:Date,
    default:Date.now()
  },

  listModifiedOn :{
    type:Date,
    default:Date.now()
  }

})


mongoose.model('List', ListSchema);