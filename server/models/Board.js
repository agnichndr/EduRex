const mongoose = require('mongoose');
const schema = mongoose.Schema;

const boardSchema = new schema(
    {
       board_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       board_name : 
       {
           type : String,
           required : true,
       },
       active : 
       {
           type : Boolean,
           required : true,
           default: true,
       }

    }

    
);

const Board = module.exports = mongoose.model("Board", boardSchema);