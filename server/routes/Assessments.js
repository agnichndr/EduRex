// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const assessments = express.Router();
const cors = require('cors');

const Assessment = require('../models/Assessment');
assessments.use(cors());

//get the list of entire assessments sorted by start date
assessments.get('/list-sort-start-date', (req,res,next)=>
{
    Assessment.find({active  : {$eq : true}}).sort({assessment_start_date:1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Assessments from Edurex Database."})
        })
});

//get the list of entire assessments sorted by end date
assessments.get('/list-sort-end-date', (req,res,next)=>
{
    Assessment.find({active  : {$eq : true}}).sort({assessment_end_date:1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Assessments from Edurex Database."})
        })
});


// // Add a new  Assessment to the database 

assessments.post('/add', (req, res, next)=>
{
    f(req.files)
    {
        attachment = req.files['attachment'];
        answer = req.files['answer'];
    }
    let newAssessment = new Assessment(
        {
            assessment_id : req.body.id,
            assessment_name : req.body.name,
            assesment_sort_description : req.body.short,
            assessment_description : req.body.description,
            assessment_start_date : req.body.start_date,
            assessment_end_date : req.body.end_date,
            assesment_attachment : null,
            assessment_full_marks :  req.body.full_marks,
            assessment_class :  req.body.class,
            assessment_subject :  req.body.subject,
            assessment_chapters : req.body.chapters,
            assessment_answers :  null,
            active : true,
        }
    );
    
    Assessment.findOne({
        assessment_id : req.body.id
    }).then ( result => {
        if(!result)
        {
            if(attachment)
            {
                    let name = attachment.name.split(".");
                    let stored_name=req.body.name+"-"+Date.now()+"."+ name[name.length-1];
                    attachment.mv("./uploads/assessment/questions/"+stored_name, 
                    (err)=>{
                        if(err)
                        {
                            res.json({"err" : "Error in uploading Attachment"})
                        }
                        })
                    newAssessment.assesment_attachment = stored_name;
                    
            }

            if(answer)
            {
                    let name = answer.name.split(".");
                    let stored_name=req.body.name+"-"+Date.now()+"."+ name[name.length-1];
                    answer.mv("./uploads/assessment/answers/"+stored_name, 
                    (err)=>{
                        if(err)
                        {
                            res.json({"err" : "Error in uploading Answers"})
                        }
                        })
                    newAssessment.assessment_answers = stored_name;
            }
            Assessment.create(newAssessment)
            .then(data=>
                {
                    res.json({"msg" : "Assessment with Id "+ newAssessment.assessment_id + " has been successfully created."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new assessment to Edurex Database. Please try after few minutes"+err});
                } 
            );
        }
    }).catch(
        err=>{
            res.json({"err": " Assessment with given ID already exists. Please try after some time"});
        }
    )
       
            }); 




// //edit a board
// boards.put("/update/:id/:board_id",(req,res,next)=>{

//     Board.findOneAndUpdate({_id : req.params.id},
//         {$set :
//         {
//             _id : req.params.id,
//             board_id : req.params.board_id,
//             board_name : req.body.board_name,
//             active : true,
//         }})
//         .then(data =>
//             {
//                 res.json({"msg" : "Board with id " + data.board_id + " has been successfully updated"});
//             })
//             .catch(err => {
//                 res.json({"err" : "Error in updating Board to Edurex Database. " });
//             })
// })

// //remove a board
// boards.put("/remove/:id",(req,res,next)=>{

//     Board.findOneAndUpdate({_id : req.params.id},
//         {$set :
//         {
//             _id : req.params.id,
//             board_id : req.body.board_id,
//             board_name : req.body.board_name,
//             active : false,
//         }})
//         .then(data =>
//             {
//                 res.json({"msg" : "Board with id " + data.board_id + " has been successfully deleted"});
//             })
//             .catch(err => {
//                 res.json({"err" : "Error in deleting Board to Edurex Database. " });
//             })
// })

// // remove many boards
// boards.put("/selected/remove/:n",(req,res,next)=>
// {
//     id = [];
//     for(var i = 0 ; i < req.params.n ; i++)
//     {
//         id.push(req.body[i].board_id)
//     }
   
//     Board.updateMany(
//         {
//            board_id : { $in : id}
//         },
//         {
//             active : false
//         }
//     ).then(
//         data => {
//             res.json({"msg": req.params.n + " boards has been successfully deleted"});
//         }
//     ).catch(err=>
//         {
//             res.json({"err": "Error in deleting "+req.params.n+" boards. Please try after few minutes." + err})
//         })
// });


module.exports = assessments