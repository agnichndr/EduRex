const mongoose = require('mongoose');
const schema = mongoose.Schema;
var Chapter = require('./Chapter')

const assessmentSchema = new schema(
    {
       assessment_id :
       {
           type : String,
           required : true
       } ,
       assessment_name : 
       {
           type : String,
           required : true,
       },
       assessment_short_description :
       {
           type:String,
           required : true,
       },
       assessment_description :
       {
           type : String,
           required : false
       },
       assessment_start_date :
       {
           type : Date,
           required : true,
       },
       assessment_end_date :
       {
           type : Date,
           required : true,
       },
       assessment_attachment :
       {
            type : String,
       },
       assessment_answers :
       {
           type : String,
       },
       assessment_full_marks :
       {
           type : Number,
           required : true
       },
       assessment_class : 
       {
            type : String,
            required : true
       },
       assessment_subject :
       {
           type : String,
           required : true
       },
       assessment_chapters : 
       {
           type : [String]
       },     active : 
       {
           type : Boolean,
           required : true,
           default: true,
       }

    }

    
);

const Assessment = module.exports = mongoose.model("Assessment", assessmentSchema);