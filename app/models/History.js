const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
let HistorySchema = new Schema({
  
  historyId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  
  type: {
    type: String,
    default: '',
  },

  historyCreatorId:{
    type: String,
    default: '',
  },

  history: {},
  
  createdOn: {
    type: Date,
    default: Date.now()
  },

})


mongoose.model('History', HistorySchema);