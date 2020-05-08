// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const chapters = express.Router();



const Chapter = require('../models/Chapter');



//Create a disk Storage object 

// var storage = multer.diskStorage(
//     {
//         destination : function(req,file,cb)
//         {
//             cb(null,'uploads/')
//         },
//         filename : function(req,file,cb)
//         {
//             cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
//         }
//     }

// )

// var upload = multer(
//     {
//         storage : storage,
//         fileFilter : function(req,file,cb)
//         {
//             if(file.mimetype == "image/jpg" ||
//             file.mimetype == "image/png" || 
//             file.mimetype == "image/jpeg")
//             {
//                 cb(null,true)
//             }
//             else{
//                 cb(null,false)
//             }
//         },
//         limits : 
//         {
//            fileSize : 1024*1024*1 // !1 MB file 
//         }
        
//     }
// )

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
    let File = null;
    
    if(req.files)
    {
        File = req.files['chapter_image'];
        
    }
    let newChapter = new Chapter(
        {
            chapter_id : req.body.chapter_id,
            chapter_name : req.body.chapter_name,
            chapter_description : req.body.chapter_description,
            chapter_subject : req.body.chapter_subject,
            chapter_class : req.body.chapter_class,
            chapter_referrence_book : req.body.chapter_referrence_book,
            image_source : "assets/images/img.png",
            active : true,
        }
    );
    
    
   Chapter.findOne({
       chapter_id : newChapter.chapter_id
   }).then ( result => {
       if(!result)
       {
            if(File)
            {
                    let name = File.name.split(".");
                    let stored_name=req.body.chapter_id+"-"+Date.now()+"."+ name[name.length-1];
                    File.mv("./uploads/chapter-images/"+stored_name, 
                    (err)=>{
                        if(err)
                        {
                            res.json({"err" : "Error in uploading Image. Image size should be less than 1 MB"})
                        }
                        })
            }

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


//Upload a Chapter Image
// chapters.post('/upload',upload.single('image') ,(req, res, next) =>
// {
//     if(req.file)
//     {
//         res.json(req.file.path);
//     }
//     else
//     {
//         res.json("error");
//     }
   
// });

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


module.exports = chapters;