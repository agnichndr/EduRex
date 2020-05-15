const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chapterSchema = new schema(
    {
       chapter_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       chapter_name : 
       {
           type : String,
           required : true,
       },
       chapter_description :
       {
           type : String,
           required : false,
       },
       chapter_subject : 
       {
           type : String,
           required : true,
       },
       chapter_class : 
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


const Board = module.exports = mongoose.model("Chapter", chapterSchema);