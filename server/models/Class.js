const mongoose = require('mongoose');
const schema = mongoose.Schema;

const classSchema = new schema(
    {
       class_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       class_name : 
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

const Class = module.exports = mongoose.model("Class", classSchema);