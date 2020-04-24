const mongoose = require('mongoose');
const schema = mongoose.Schema;

const sessionSchema = new schema(
    {
       session_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       session_name : 
       {
           type : String,
           required : true,
       },
       active : 
       {
           type : Boolean,
           required : true,
           default: true,
       },
       current :{
           type : Boolean,
           required : true,
           default : false,
       }

    }

    
);

const Session = module.exports = mongoose.model("Session", sessionSchema);