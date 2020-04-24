// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const groups = express.Router();
const cors = require('cors');

const Group = require('../models/Subject_Group');
groups.use(cors());

groups.post('/list/filter',(req,res,next)=>
{
    Group.find(
        {$and :
            {active : 
                {$eq : true},
            
            subject : {
                subject_id : {$in : req.body.subjects},
            }
            }
        }
            ).then(
                data=> res.json(data)
            )
})
//get group by Id
groups.post('/get/:id',(req,res,next)=>
{
    Group.findOne({group_id : req.params.id}).then(
        data=>{
            res.json(data)
        }
    ).catch(err=>{
        res.json({"err":"Error in getting the group with id :"+req.params.id})
    })

})

// get the list of entire subject groups
groups.get('/list', (req,res,next)=>
{
    Group.find({active  : {$eq : true}}).sort({group_name:1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Subject Groups from Edurex Database."})
        })
});

// // Add a new  Group to the database 

groups.post('/add', (req, res, next)=>
{
   

   Group.findOne({
       group_id : req.body.group_id
   }).then ( result => {
       if(!result)
       {
            Group.create(req.body)
            .then(data=>
                {
                    res.json({"msg" : "Group with Id "+ req.body.group_id + " has been successfully registered."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new subject group to Edurex Database. Please try after few minutes"+err});
                } 
            )
       }
       else{
           res.json({"err" : "Group Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

// //edit a group
groups.put("/update/:id",(req,res,next)=>{

    Group.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            group_id : req.body.group_id,
            group_name : req.body.group_name,
            active : true,
            subject : req.body.subject
        }})
        .then(data =>
            {
                res.json({"msg" : "Group with id " + data.group_id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating group to Edurex Database. " });
            })
})


//remove a group
groups.put("/remove/:id",(req,res,next)=>{

    Group.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            group_id : req.body.group_id,
            group_name : req.body.group_name,
            active : false,
            subject : req.body.subject
        }})
        .then(data =>
            {
                res.json({"msg" : "Session with id " + data.group_id + " has been successfully deleted"});
            })
            .catch(err => {
                res.json({"err" : "Error in deleting group from Edurex Database. "+err });
            })
})

// remove many sessions
groups.put("/selected/remove/:n",(req,res,next)=>
{
    id = [];
    for(var i = 0 ; i < req.params.n ; i++)
    {
        id.push(req.body[i].group_id)
    }
   
    Session.updateMany(
        {
           group_id : { $in : id}
        },
        {
            active : false
        }
    ).then(
        data => {
            res.json({"msg": req.params.n + " groups has been successfully deleted"});
        }
    ).catch(err=>
        {
            res.json({"err": "Error in deleting "+req.params.n+" groups. Please try after few minutes." })
        })
});


module.exports = groups;