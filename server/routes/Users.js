// Developed by : Agnibha Chandra , 2020 , March -29

const express = require('express');
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'edurex';


// register a user 
users.post('/register', (req,res) =>{
{
    const today = new Date();
    let userData = new User({
        user_number :req.body.user_number,
        password : req.body.password,
        role : req.body.role,
        created : today,
        active : true
    });

    User.findOne(
        {
            user_number:req.body.user_number,
        }
    ).then(
        user => {
            if(!user)
            {
                bcrypt.hash(req.body.password,10,(err,hash)=>
                {
                    userData.password = hash;
                                
                    User.create(userData)
                        .then
                        (user => 
                            {
                                res.json({status : 'User with User ID :'+ user.user_number + ' has been Registered successfully!'})
                            })
                            .catch(err =>
                                {
                                    res.send('error: '+ err)
                                })
               });
                
            }
            else
            {
                res.json({error : userData.user_number +' phone number already exist. Please try with a different number!' })
            }
        }
    )
    .catch(err =>
        {
            res.send('error :'+ err)
        });
}});

//login a user 
users.post('/login',(req,res)=>
{
    User.findOne(
        {
            user_number:req.body.user_number
        }
    ).then(user =>
        {
            if(user)
            {
                if(bcrypt.compareSync(req.body.password,user.password))
                {
                    const payload = {
                        _id : user.id,
                        user_number : user.user_number,
                        role : user.role
                    }

                    let token = jwt.sign(payload,process.env.SECRET_KEY,
                        {
                            expiresIn : 1440
                        })
                    res.json({token : token})
                }
                else{
                    res.json({error : "User Id or password is Invalid!"})
                }
            }
            else
            {
                res.json({error : "User doesn't exists !"})
            }
        }).catch(err =>
            {
                res.send("error :" + err);
            })
})

// get profile details
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  
    User.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  

module.exports = users;