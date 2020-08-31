const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const {JWT_SECRET}=require("../config/keys")
const User = require("../models/user.model");
// const sendgridTransport = require('nodemailer-sendgrid-transport')
// const {SENDGRID_API,EMAIL} = require('../config/keys')
// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth:{
// api_key:"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"
//   }
// }))

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: process.env.EMAIL_GMAIL,
     pass: process.env.PASSWORD_GMAIL
  }
});

const signUp = (req, res) => {
  const { name, email, password,photo } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "please add all fields" });
  } else {
    User.findOne({ email })
      .then((savedUser) => {
        if (savedUser) {
          return res
            // .status(422)
            .json({ error: `this Email ${email} already exists` });
        } else {
          bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new User({ name, email, password:hashedPassword,photo });
            user
              .save()
              .then((user) => {
                transporter.sendMail({
                    to:user.email,
                    from:"lassouliyahya@gmail.com",
                    subject:"signup success",
                    html:`<h1>welcome ${user.name} to instagram</h1>`
                }, function(err, info) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log(info);
                  }
                })
                res.json({message:`saved  ${email} successfully  `});
              })
              .catch((error)=>console.log(error))
          });
        }
      })
      .catch((error)=>console.log(error))
  }
};
const logIn=(req,res)=>{
  const {email,password}=req.body
  if (!email || !password) {
      return res.json({ error: "please add all fields" });
    } else {
      User.findOne({email}).then((savedUser)=>{
          if(!savedUser){
      return res.json({ error: `this ${email} isn't exist our system ` });
          }else{
              bcrypt.compare(password,savedUser.password).then((isMatch)=>{
                 if(isMatch)  {
                  const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {
                      expiresIn: "2d",
                    });
                  const {_id,name/* ,email,photo,followers,following */}=savedUser
                    return res.json({ token,user:{_id,name/* ,email,photo,followers,following */} });
                  }
                 else  return res.json({ error: "password is not correct" });
              })
          }
      }).catch((error)=>console.log(error))
    }
  }
const resetPassword=(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email, //"lassouliyahya@gmail.com"
                  from:"lassouliyahya@gmail.com",
                  subject:"password reset",//bhal Title ola header
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhost:3000/reset-password/${token}">link</a> to reset password</h5>
                  `
              }, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }
              })
              res.json({message:"check your email"})
          })

      })
  })
}
const newPassword=(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
}


module.exports = {
  signUp,
  logIn,
  resetPassword,
  newPassword
};
