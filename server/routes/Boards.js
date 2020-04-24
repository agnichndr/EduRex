// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const boards = express.Router();
const cors = require('cors');

const Board = require('../models/Board');
boards.use(cors());

// get the list of entire boards

boards.get('/list', (req,res,next)=>
{
    Board.find({active  : {$eq : true}}).sort({board_name:1})
    .then(
        data => 
        {
            res.json(data)
        }
    )
    .catch(err =>
        {
            res.json({"err": "Error in loading the list of Boards from Edurex Database."})
        })
});

// Add a new  Board to the database 

boards.post('/add', (req, res, next)=>
{
    let newBoard = new Board(
        {
            board_id : req.body.board_id,
            board_name : req.body.board_name,
            active : true,
        }
    );

   Board.findOne({
       board_id : newBoard.board_id
   }).then ( result => {
       if(!result)
       {
            Board.create(newBoard)
            .then(data=>
                {
                    res.json({"msg" : "Board with Id "+ newBoard.board_id + " has been successfully registered."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new board to Edurex Database. Please try after few minutes"});
                } 
            )
       }
       else{
           res.json({"err" : "Board Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

//edit a board
boards.put("/update/:id/:board_id",(req,res,next)=>{

    Board.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            board_id : req.params.board_id,
            board_name : req.body.board_name,
            active : true,
        }})
        .then(data =>
            {
                res.json({"msg" : "Board with id " + data.board_id + " has been successfully updated"});
            })
            .catch(err => {
                res.json({"err" : "Error in updating Board to Edurex Database. " });
            })
})

//remove a board
boards.put("/remove/:id",(req,res,next)=>{

    Board.findOneAndUpdate({_id : req.params.id},
        {$set :
        {
            _id : req.params.id,
            board_id : req.body.board_id,
            board_name : req.body.board_name,
            active : false,
        }})
        .then(data =>
            {
                res.json({"msg" : "Board with id " + data.board_id + " has been successfully deleted"});
            })
            .catch(err => {
                res.json({"err" : "Error in deleting Board to Edurex Database. " });
            })
})

// remove many boards
boards.put("/selected/remove/:n",(req,res,next)=>
{
    id = [];
    for(var i = 0 ; i < req.params.n ; i++)
    {
        id.push(req.body[i].board_id)
    }
   
    Board.updateMany(
        {
           board_id : { $in : id}
        },
        {
            active : false
        }
    ).then(
        data => {
            res.json({"msg": req.params.n + " boards has been successfully deleted"});
        }
    ).catch(err=>
        {
            res.json({"err": "Error in deleting "+req.params.n+" boards. Please try after few minutes." + err})
        })
});


module.exports = boards;