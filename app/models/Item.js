const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let ItemSchema = new Schema({
  
  listId: {
    type: String,
    default: '',
  },
  itemId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },

  itemName: {
    type: String,
    default: ''
  },

  itemCreatorId: {
    type: String,
    default: ''
  },

  itemCreatorName: {
    type: String,
    default: ''
  },
  
  itemCreatedOn :{
    type:Date,
    default:Date.now()
  },
  
  itemModifiedOn :{
    type:Date,
    default:Date.now()
  },

  itemModifierId: {
    type: String,
    default: ''
  },
  itemModifierName: {
    type: String,
    default: ''
  },

  itemDone:{
    type:String,
    default:'open'
  },

  subItems:{
    type:[{
      
      subItemId: {
        type: String,
        default: '',
      },
    
      subItemName: {
        type: String,
        default: ''
      },
    
      subItemCreatorId: {
        type: String,
        default: ''
      },
      subItemCreatorName: {
        type: String,
        default: ''
      },
      
      subItemCreatedOn :{
        type:Date,
        default:""
      },
      subItemModifiedOn :{
        type:Date,
        default:""
      },
    
      subItemModifierId: {
        type: String,
        default: ''
      },
      subItemModifierName: {
        type: String,
        default: ''
      },

      subItemDone:{
        type:String,
        default:'open'
      },    
    }]
  }
})
mongoose.model('Item', ItemSchema);