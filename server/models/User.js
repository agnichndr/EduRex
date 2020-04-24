const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// User Database Schema
const UserSchema = new Schema(
    {
        user_number :
        {
            type:String,
            required : true,
            unique : true
        },
        password : {
            type: String,
            required : true
        },
        role:{
            type : String,
            required : true
        },
        created : {
            type : Date,
            require : true,
            default : Date.now()
        },
        active : {
            type : Boolean,
            required : true,
        }
        
    }
)

const User  = module.exports = mongoose.model('User', UserSchema);