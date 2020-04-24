// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const sessions = express.Router();
const cors = require('cors');

const Session = require('../models/Session');
sessions.use(cors());

// get the list of entire sessions
sessions.get('/list', (req,res,next)=>
{
    Session.find({active  : {$eq : true}})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Sessions from Edurex Database."})
        })
});

// Add a new  Session to the database 

sessions.post('/add', (req, res, next)=>
{
    let newSession = new Session(
        {
            session_id : req.body.session_id,
            session_name : req.body.session_name,
            active : true,
            current : req.body.current,
        }
    );

   Session.findOne({
       session_id : newSession.session_id
   }).then ( result => {
       if(!result)
       {
            Session.create(newSession)
            .then(data=>
                {
                    res.json({"msg" : "Session with Id "+ newSession.session_id + " has been successfully registered."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new session to Edurex Database. Please try after few minutes"});
                } 
            )
       }
       else{
           res.json({"err" : "Session Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

//edit a session
sessions.put("/update/:id/:session_id",(req,res,next)=>{

    Session.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            session_id : req.body.session_id,
            subject_name : req.body.session_name,
            active : true,
            current : req.body.current
        }})
        .then(data =>
            {
                res.json({"msg" : "Session with id " + data.session_id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating Session to Edurex Database. " });
            })
})


//remove a session
sessions.put("/remove/:id",(req,res,next)=>{

    Session.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            session_id : req.body.session_id,
            session_name : req.body.session_name,
            active : false,
            current : req.body.current
        }})
        .then(data =>
            {
                res.json({"msg" : "Session with id " + data.session_id + " has been successfully deleted"});
            })
            .catch(err => {
                res.json({"err" : "Error in deleting Session from Edurex Database. "+err });
            })
})

// remove many sessions
sessions.put("/selected/remove/:n",(req,res,next)=>
{
    id = [];
    for(var i = 0 ; i < req.params.n ; i++)
    {
        id.push(req.body[i].session_id)
    }
   
    Session.updateMany(
        {
           session_id : { $in : id}
        },
        {
            active : false
        }
    ).then(
        data => {
            res.json({"msg": req.params.n + " sessions has been successfully deleted"});
        }
    ).catch(err=>
        {
            res.json({"err": "Error in deleting "+req.params.n+" sessions. Please try after few minutes." })
        })
});

// toggle current session
sessions.put("/current/:id",(req,res,next)=>{

    Session.updateMany({$and : [{current : true},{active : true}]},{$set : {current : false}})
    .then()
    .catch();

    Session.update({session_id : {$eq : req.params.id}},{
       $set :{current : true}
    }).then(
        data =>{
            res.json({"msg" : "Session with id "+ req.params.id + " has been set to current"});
        }
    ).catch(err =>
        {
            res.json({"err": "Error in setting the current session"});
        }) 
})
module.exports = sessions;