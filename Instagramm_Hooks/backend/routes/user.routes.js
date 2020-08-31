const express = require('express');

const { getUser,getAllUsers ,updateUser,getAutreUser,follow,unfollow,searchUsers} = require("../controllers/user.controller")
const {requiredLogin}=require("../helpersMeddlwire/requiredLogin")//pour protecter mes routes

const userRoutes = express.Router();
userRoutes.get("/profile", requiredLogin,getUser); //profile dyali
userRoutes.get("/profiles", requiredLogin,getAllUsers);

userRoutes.get("/user/:id", requiredLogin, getAutreUser);//chi profile okhr mn ghir dyali
userRoutes.put('/follow',requiredLogin,follow)
userRoutes.put('/unfollow',requiredLogin,unfollow)
userRoutes.put("/profile", requiredLogin, updateUser);
userRoutes.post("/search-users", requiredLogin, searchUsers);

module.exports = {
  userRoutes
}