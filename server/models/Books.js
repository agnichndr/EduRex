const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema(
    {
       book_id :
       {
           type : String,
           unique : true,
           required : true
       } ,
       book_name : 
       {
           type : String,
           required : true,
       },
       author :
       {
           type : String,
           required : true,
       },
       description :
       {
            type : String,
            required : true,
       },
       category : 
       {
           type : String,
           required : true,
       },
       sub_category: 
       {
           type : String,
       },
       book_source :
       {
           type : String,
           required : true,
       },
       thumbnail_source :
       {
           type : String,
       },
       date_of_published :
       {
           type : Date,
       },
       total_view :
       {
           type : Number,
           required : true,
           default : 0
       },
       total_like : 
       {
            type : Number,
            required : true,
            default : 0 
       },
       total_like : 
       {
            type : Number,
            required : true,
            default : 0 
       },
       total_dislike : 
       {
            type : Number,
            required : true,
            default : 0 
       },
       total_rating : 
       {
            type : Number,
            required : true,
            default : 0 
       },
       rating_count : 
       {
            type : Number,
            required : true,
            default : 0 
       },
       active : 
       {
           type : Boolean,
           required : true,
           default: true,
       }

    }

    
);


const Book = module.exports = mongoose.model("Book", bookSchema);