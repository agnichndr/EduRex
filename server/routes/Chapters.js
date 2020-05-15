// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const chapters = express.Router();



const Chapter = require('../models/Chapter');

//get chapter by id

chapters.get('/get/:id', (req,res,next)=>{
    Chapter.findOne({chapter_id : req.params.id}).then(
        data=>{
            res.json(data);
        }
    ).catch(err=>{
        res.json({"err":"Error in loading chapter"});
    })
})

// get the list of chapters subject and class wise 

chapters.get('/list/:chapter_subject/:chapter_class', (req,res,next)=>
{
    Chapter.find({$and : [{active  : {$eq : true}},
        {chapter_subject : req.params.chapter_subject},
    {chapter_class : req.params.chapter_class}]}).sort({chapter_name : 1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Chapters from Edurex Database."})
        })
});

// Add a new  Chapter to the database 

chapters.post('/add',(req, res, next)=>
{
    let newChapter = new Chapter(
        {
            chapter_id : req.body.chapter_id,
            chapter_name : req.body.chapter_name,
            chapter_description : req.body.chapter_description,
            chapter_subject : req.body.chapter_subject,
            chapter_class : req.body.chapter_class,
            active : true,
        }
    );
    
    
   Chapter.findOne({
       chapter_id : newChapter.chapter_id
   }).then ( result => {
       if(!result)
       {

            Chapter.create(newChapter)
            .then(data=>
                {
                    res.json({"msg" : "Chapter with Id "+ newChapter.chapter_id + " has been successfully created."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new Chapter to Edurex Database. Please try after few minutes" + err});
                } 
            )
       }
       else{
           res.json({"err" : "Chapter Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})


//edit chapter 
chapters.put("/update/:id",(req,res,next)=>{

    Chapter.findOneAndUpdate({chapter_id : req.params.id},
        {$set :
        {
            chapter_name : req.body.chapter_name,
            chapter_description : req.body.chapter_description,
            chapter_subject : req.body.chapter_subject,
            chapter_class : req.body.chapter_class,
        }})
        .then(data =>
            {
                res.json({"msg" : "Chapter with id " + req.params.id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating Chapter to Edurex Database. " });
            })
})

//delete a chapter
chapters.put('/remove/:id',(req,res,next)=>{
    Chapter.findOneAndUpdate({chapter_id:req.params.id},
        {
            $set : {
                active : false
            }
        }).then(
            data=>{
                res.json({"msg":"Chapter with id :"+ req.params.id + "has been successfully deleted"});
            }
        ).catch(
            err=>{
                res.json({"err":"Error in deleting Chapter from Edurex database"});
            }
        )
})



module.exports = chapters;