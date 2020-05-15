// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const books = express.Router();
const dateFormat = require('dateformat');
const fs = require('fs');
const multer = require('multer');
const Books = require('../models/Books');

//Get Book by Id
books.get('/view/:id',(req,res,next)=>
{
    Books.findOne({book_id : req.params.id})
    .then(
        data =>
        {
            res.json(data)
        }
    )
    .catch(
        err=>
        {
            res.json({"err": "Error in loading  Book with id " + req.params.id+" from Edurex Database."}) 
        }
    )
})

//get list of latest release
books.get('/list/latest',(req,res,next)=>
{
    Books.find({active : true}).limit(5).then(
        data=>{
            res.json(data);
        }
    ).catch(err=>{
        res.json({"err": "Error in loading the list of Books from Edurex Database."})
    })
})

// Get List of All Books;
books.get('/list/:category/:subcategory',(req,res,next)=>
{
    if(req.params.category == "all")
    {
        Books.find({active  : {$eq : true}},)
        .sort({book_name : 1})
            .then(
                data => 
                {
                    res.json(data)
                }
            )
            .catch(err =>
                {
                    res.json({"err": "Error in loading the list of Books from Edurex Database."})
                })
    }
    else{
        if(req.params.subcategory == "all")
        {
            Books.find({$and : [{active  : {$eq : true}},
            {category : req.params.category}] })
            .sort({book_name : 1})
                .then(
                    data => 
                    {
                        res.json(data)
                    }
                )
                .catch(err =>
                    {
                        res.json({"err": "Error in loading the list of Books from Edurex Database."})
                    })
        }
        else
        {
            Books.find({$and : [{active  : {$eq : true}},
            {category : req.params.category},
            {subcategory : req.params.subcategory}]})
            .sort({book_name : 1})
                .then(
                    data => 
                    {
                        res.json(data)
                    }
                )
                .catch(err =>
                    {
                        res.json({"err": "Error in loading the list of Books from Edurex Database."})
                    })
        }
    }
    
})


// Add a new  Book to the database

books.post('/add',(req, res, next)=>
{
    let Book = null;
    let Cover = null;
    
    if(req.files)
    {
        Book = req.files['book'];
        Cover = req.files['thumbnail_image'];
    }
    let newBook = new Books(
        {
            book_id : req.body.book_id,
            book_name : req.body.name,
            author : req.body.author,
            publisher : req.body.publisher,
            description : req.body.description,
            category : req.body.category,
            subcategory: req.body.subcategory,
            subscription : req.body.subscription,
            language : req.body.language,
            book_source : null,
            thumbnail_source : null,
            date_of_published : new Date(Date.now()),
            type : null
        }
    );


    
    
    
   Books.findOne({
       book_id : newBook.book_id
   }).then ( result => {
       if(!result)
       {
            if(Book)
            {
                    let name = Book.name.split(".");
                    let stored_name=req.body.name+"-"+Date.now()+"."+ name[name.length-1];
                    Book.mv("./uploads/library/books/"+stored_name, 
                    (err)=>{
                        if(err)
                        {
                            res.json({"err" : "Error in uploading Article. Document size should be less than 100 MB"})
                        }
                        })
                    newBook.book_source = stored_name;
                    newBook.type = name[name.length-1];
            }

            if(Cover)
            {
                    let name = Cover.name.split(".");
                    let stored_name=req.body.name+"-"+Date.now()+"."+ name[name.length-1];
                    Cover.mv("./uploads/library/cover-photos/"+stored_name, 
                    (err)=>{
                        if(err)
                        {
                            res.json({"err" : "Error in uploading Thumbnail Image. Image size should be less than 1 MB"})
                        }
                        })
                    newBook.thumbnail_source = stored_name;
            }

            Books.create(newBook)
            .then(data=>
                {
                   
                    res.json({"msg" : "Book with Id "+ newBook.book_id + " has been successfully created."});
        
                })
            .catch(
                err =>
                {
                    res.json({"err": " Error in adding a new Book to Edurex Database. Please try after few minutes" + err});
                } 
            )
       }
       else{
           res.json({"err" : "Book Id already exists. Please try with a different id"});
       }
   })
   .catch(err =>
    {
        res.json({"err": err})
    })


})

//Edit a thumbnail
books.put('/edit/thumbnail/:id',(req,res,next)=>{

    var stored_name="";
    if(req.files)
    {
        Cover = req.files['thumbnail_image'];
        
    }

                    Books.findOne({
                        book_id : req.params.id
                    }).then ( result => {
                        if(result)
                        {
                            

                            if(Cover)
                            {
                                var name = Cover.name.split(".");
                                stored_name=result.book_name+"-"+Date.now()+"."+ name[name.length-1];
                                    Cover.mv("./uploads/library/cover-photos/"+stored_name, 
                                    (err)=>{
                                        if(err)
                                        {
                                            res.json({"err" : "Error in uploading Thumbnail Image. Image size should be less than 1 MB"})
                                        }
                                        })
                                    
                                        fs.unlinkSync("./uploads/library/cover-photos/"+result.thumbnail_source);
                                    
                                        Books.findOneAndUpdate({book_id : req.params.id},
                                            {$set : {thumbnail_source : stored_name}})
                                            .then(data=>{
                                                res.json({"msg" : "Thumbnail Image has been updated successfully!"});
                                            }).catch(err=>{
                                                res.json({"err" : "Error in setting the thumbnail image path"});
                                            })
                                        }       
                                            

                        }
                        else
                        {
                            res.json({"err" : "No Such Book Exists wit id : " + req.params.id});
                        }

                }).catch(
                    err=>{
                        res.json({"err" : "No Such Book Exists wit id : " + req.params.id});
                    }
                )

               

                
})

                    


//Edit a pdf content
books.put('/edit/content/:id',(req,res,next)=>{

    var stored_name="";
    if(req.files)
    {
        Book = req.files['book'];
        
        
    }

                    Books.findOne({
                        book_id : req.params.id
                    }).then ( result => {
                        if(result)
                        {
                            

                            if(Book)
                            {
                                var name = Book.name.split(".");
                                stored_name=result.book_name+"-"+Date.now()+"."+ name[name.length-1];
                                    Book.mv("./uploads/library/books/"+stored_name, 
                                    (err)=>{
                                        if(err)
                                        {
                                            res.json({"err" : "Error in uploading Book. Document size should be less than 100 MB"})
                                        }
                                        })
                                    
                                        fs.unlinkSync("./uploads/library/books/"+result.book_source);
                                    
                                        Books.findOneAndUpdate({book_id : req.params.id},
                                            {$set : {book_source : stored_name, 
                                                date_of_published :new Date(Date.now()),
                                                total_view :0,
                                                total_download :0, 
                                                total_like : 0,
                                                total_dislike : 0,
                                                total_rating : 0,
                                                rating_count : 0,
                                                type :name[name.length-1]
                                                

                                            }})
                                            .then(data=>{
                                                res.json({"msg" : "Book has been updated successfully!"});
                                            }).catch(err=>{
                                                res.json({"err" : "Error in setting the document path"});
                                            })
                                        }       
                                            

                        }
                        else
                        {
                            res.json({"err" : "No Such Book Exists with id : " + req.params.id});
                        }

                }).catch(
                    err=>{
                        res.json({"err" : "No Such Book Exists with id : " + req.params.id});
                    }
                )

               

                
})
    


//Edit a  book
books.put('/edit/:id',(req,res,next)=>
{
    Books.findOneAndUpdate({book_id : req.params.id},
        {
            $set : {
                book_name : req.body.name,
                author : req.body.author,
                publisher : req.body.publisher,
                description : req.body.description,
                category : req.body.category,
                subcategory: req.body.subcategory,
                subscription : req.body.subscription,
            }

        }).then(data => {
            res.json({"msg" : "Book has been Updated Successfully" })
        }).catch(err => {
            res.json({"err" : "Error in updating Book"})
        })
    
})

//Delete a Book
books.put('/delete/:id', (req,res,next)=>
{
   
          Books.findOne({book_id : req.params.id}).
          then(data=>{  
            if(data)
            {

                fs.unlinkSync('./uploads/library/books/'+data.book_source)
                fs.unlinkSync("./uploads/library/cover-photos/"+data.thumbnail_source);

                Books.findOneAndUpdate({book_id : req.params.id},
                    {
                        $set : {
                            active : false
                        }
            
                    }).then(data => {
                        res.json({"msg" : "Book has been Deleted Successfully" })
                    }).catch(err => {
                        res.json({"err" : "Error in deleting Book"})
                    })

            }
          }).catch(err=>{
            res.json({"err" : "Error in deleting Book from Edurex Database. " });
          })        
      
})

module.exports = books;