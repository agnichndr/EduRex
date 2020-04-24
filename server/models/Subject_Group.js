const mongoose = require('mongoose');
const schema = mongoose.Schema;


var subSchema = new schema(
    {
        subject_id  : 
        {
            type : String,
            required : true,
        },
        classes_id :
        {
            type :[String],
            required : true
        },
      
    }
)
const groupSchema = new schema(
    {
       group_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       group_name : 
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
       subject : 
       {
           type : [subSchema],
           required : true
       }
      
       

    }

    
);

const Group = module.exports = mongoose.model("Group", groupSchema);