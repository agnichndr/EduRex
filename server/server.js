var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var app = express();
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
var path = require('path');



app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 1024 },} // 1 GB File size
));
app.use(bodyParser.urlencoded({extended:false}))

const mongoURI = 'mongodb://localhost:27017/edurexdb';

mongoose.connect(mongoURI, {useNewUrlParser:true})
.then(() => console.log("MongoDB Edurex Database Connected ..."))
.catch(err => console.log(err));

var connection = mongoose.connection;

var Counters = require('./routes/Counters')
var Users = require('./routes/Users');
var Boards = require('./routes/Boards');
var Class = require('./routes/Class');
var Subject = require('./routes/Subjects');
var Session = require('./routes/Sessions')
var Group = require('./routes/Groups'); 
var Assessment = require('./routes/Assessments');
var Chapter = require('./routes/Chapters');
var LibraryCategory = require('./routes/LibraryCategories')
var Book = require('./routes/Books');

app.use('/thumbnail',express.static(path.join(__dirname, 'uploads/library/cover-photos/')));
app.use('/article',express.static(path.join(__dirname, 'uploads/library/books/')));
app.use('/counters',Counters)
app.use('/users', Users);
app.use('/boards', Boards);
app.use('/class', Class);
app.use('/subjects', Subject);
app.use('/sessions', Session);
app.use('/subject-groups',Group);
app.use('/assessments',Assessment);
app.use('/chapters',Chapter);
app.use('/library/category',LibraryCategory);
app.use('/library/books',Book);


app.get('/library/books/languages/list',(req,res,next)=>{

    connection.db.collection("iso_lang", function(err, collection){
        if(err)
        {
            res.json({"err":"Error in Loading Languages"})
        }
        collection.find({}).toArray(function(err, data){
            if(err)
            {
                res.json({"err":"Error in Loading Languages"})
            }
            res.json(data)
        })
    });

})

app.get('/library/books/languages/get/:id',(req,res,next)=>{
    connection.db.collection("iso_lang", function(err, collection){
        if(err)
        {
            res.json({"err":"Error in Loading Language"})
        }
        collection.findOne({code : req.params.id}).then(
            data=>{
                res.json(data)
            }
        ).catch(err=>{
            res.json({"err":"Error in Loading Language"})
        })
            
    });

})


app.get('/library/config/list',(req,res,next)=>{

    connection.db.collection("library_config", function(err, collection){
        if(err)
        {
            res.json({"err":"Error in Loading library Config Parameters"})
        }
        collection.find({}).toArray(function(err, data){
            if(err)
            {
                res.json({"err":"Error in Loading library Config Parameters"})
            }
            res.json(data)
        })
    });

})

app.get('/counter/list',(req,res,next)=>{
    connection.db.collection('counters',(err,collection)=>{
        if(err)
        {
            res.json({"err" : "Error in loading counter Parameters"})
        }
        collection.find({}).toArray(function(err, data){
            if(err)
            {
                res.json({"err":"Error in Loading counter Parameters"})
            }
            res.json(data)
        })
    })
})


app.put('/library/config/set',(req,res,next)=>{

    connection.db.collection("library_config", function(err, collection){
        if(err)
        {
            res.json({"err":"Error in setting Config Parameters"})
        }
        collection.findOneAndUpdate({_id : {$ne :null}},
            {$set : {
                release : req.body.release,
                img_size : req.body.img_size,
                doc_size : req.body.doc_size,
            }}).then(
                data=>{
                    res.json({"msg":"Configuration Parameters Updated Successfully!"}) 
                }
            ).catch(err =>{
                res.json({"err":"Error in setting Config Parameters"});
            })
    });

})


app.listen(port, function()
{
    console.log("Edurex Server is running on port "+ port);
});