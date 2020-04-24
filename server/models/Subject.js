const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subjectSchema = new schema(
    {
       subject_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       subject_name : 
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

const Subject = module.exports = mongoose.model("Subject", subjectSchema);