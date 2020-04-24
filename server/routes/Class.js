// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const classes = express.Router();
const cors = require('cors');

const Class = require('../models/Class');
classes.use(cors());

// get the list of entire boards

classes.get('/list', (req,res,next)=>
{
    Class.find({active  : {$eq : true}})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Classes from Edurex Database."})
        })
});

// Add a new  Board to the database 

classes.post('/add', (req, res, next)=>
{
    let newClass = new Class(
        {
            class_id : req.body.class_id,
            class_name : req.body.class_name,
            active : true,
        }
    );

   Class.findOne({
       class_id : newClass.class_id
   }).then ( result => {
       if(!result)
       {
            Class.create(newClass)
            .then(data=>
                {
                    res.json({"msg" : "Class with Id "+ newClass.class_id + " has been successfully created."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new class to Edurex Database. Please try after few minutes"});
                } 
            )
       }
       else{
           res.json({"err" : "Class Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

//edit a board
classes.put("/update/:id/:class_id",(req,res,next)=>{

    Class.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            class_id : req.params.class_id,
            class_name : req.body.class_name,
            active : true,
        }})
        .then(data =>
            {
                res.json({"msg" : "Class with id " + data.class_id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating Board to Edurex Database. " });
            })
})

//remove a board
classes.put("/remove/:id",(req,res,next)=>{

    Class.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            class_id : req.body.class_id,
            class_name : req.body.class_name,
            active : false,
        }})
        .then(data =>
            {
                res.json({"msg" : "Board with id " + data.class_id + " has been successfully deleted"});
            })
            .catch(err => {
                res.json({"err" : "Error in deleting Board to Edurex Database. "+err });
            })
})

//delete many classes
classes.put("/selected/remove/:n",(req,res,next)=>
{
    id = [];
    for(var i = 0 ; i < req.params.n ; i++)
    {
        id.push(req.body[i].class_id)
    }
   
    Class.updateMany(
        {
           class_id : { $in : id}
        },
        {
            active : false
        }
    ).then(
        data => {
            res.json({"msg": req.params.n + " classes has been successfully deleted"});
        }
    ).catch(err=>
        {
            res.json({"err": "Error in deleting "+req.params.n+" classes. Please try after few minutes." + err})
        })
});


module.exports = classes;