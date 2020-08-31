const express = require('express');

const {createPost,allPosts,myPosts,like,unlike,comment,deletePost,getsubpost}=require("../controllers/post.controller")
const postRoutes=express.Router();
const {requiredLogin}=require("../helpersMeddlwire/requiredLogin")//pour protecter mes routes

postRoutes.post("/createpost",requiredLogin,createPost)
postRoutes.get("/allposts",allPosts)
postRoutes.get("/mypost",requiredLogin,myPosts)//db njibo all my posts by _id lkayjina mn authorization/req.user._id
postRoutes.put('/like',requiredLogin,like)
postRoutes.put('/unlike',requiredLogin,unlike)
postRoutes.put('/comment',requiredLogin,comment)
postRoutes.delete('/deletepost/:postId',requiredLogin,deletePost)
postRoutes.get("/getsubpost",requiredLogin,getsubpost)//db njibo all my posts by _id lkayjina mn authorization/req.user._id


module.exports={
    postRoutes
}