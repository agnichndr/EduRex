// Developed by : Agnibha Chandra , March 30 , 2020

const express = require('express');
const books = express.Router();
const dateFormat = require('dateformat');


const Books = require('../models/Books');

// Get List of All Books;
books.get('/list/:category/:subcategory',(req,res,next)=>
{
    if(req.params.category == "all")
    {
        Books.find({active  : {$eq : true}},)
        .sort({name : 1})
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
            .sort({name : 1})
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
            .sort({name : 1})
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
            description : req.body.description,
            category : req.body.category,
            sub_category: req.body.sub_category,
            book_source : null,
            thumbnail_source : null,
            date_of_published : dateFormat(new Date(Date.now()), "dd-mm-yyyy h:MM:ss")
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

module.exports = books;