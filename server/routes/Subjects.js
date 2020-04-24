// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const subjects = express.Router();
const cors = require('cors');

const Subject = require('../models/Subject');
subjects.use(cors());

//get subject by id
subjects.post('/get/:id',(req,res,next)=>
{
    Subject.findOne({subject_id : req.params.id})
    .then(
        data=>{
            res.send(data.subject_name);
        }
    )
    .catch(err=>
        {
            res.json({"err":"No subject with such Id exists"})
        })
})

// get the list of entire subjects
subjects.get('/list', (req,res,next)=>
{
    Subject.find({active  : {$eq : true}}).sort({subject_name : 1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Subjects from Edurex Database."})
        })
});

// Add a new  Subject to the database 

subjects.post('/add', (req, res, next)=>
{
    let newSubject = new Subject(
        {
            subject_id : req.body.subject_id,
            subject_name : req.body.subject_name,
            active : true,
        }
    );

   Subject.findOne({
       subject_id : newSubject.subject_id
   }).then ( result => {
       if(!result)
       {
            Subject.create(newSubject)
            .then(data=>
                {
                    res.json({"msg" : "Subject with Id "+ newSubject.subject_id + " has been successfully registered."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new subject to Edurex Database. Please try after few minutes"});
                } 
            )
       }
       else{
           res.json({"err" : "Subject Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

//edit a subject
subjects.put("/update/:id/:board_id",(req,res,next)=>{

    Subject.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            subject_id : req.body.subject_id,
            subject_name : req.body.subject_name,
            active : true,
        }})
        .then(data =>
            {
                res.json({"msg" : "Subject with id " + data.subject_id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating Board to Edurex Database. " });
            })
})

//remove a subject
subjects.put("/remove/:id",(req,res,next)=>{

    Subject.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            subject_id : req.body.subject_id,
            subject_name : req.body.subject_name,
            active : false,
        }})
        .then(data =>
            {
                res.json({"msg" : "Subject with id " + data.subject_id + " has been successfully deleted"});
            })
            .catch(err => {
                res.json({"err" : "Error in deleting Subject from Edurex Database. " });
            })
})

// remove many subjects
subjects.put("/selected/remove/:n",(req,res,next)=>
{
    id = [];
    for(var i = 0 ; i < req.params.n ; i++)
    {
        id.push(req.body[i].subject_id)
    }
   
    Subject.updateMany(
        {
           subject_id : { $in : id}
        },
        {
            active : false
        }
    ).then(
        data => {
            res.json({"msg": req.params.n + " subjects has been successfully deleted"});
        }
    ).catch(err=>
        {
            res.json({"err": "Error in deleting "+req.params.n+" subjects. Please try after few minutes." })
        })
});


module.exports = subjects;