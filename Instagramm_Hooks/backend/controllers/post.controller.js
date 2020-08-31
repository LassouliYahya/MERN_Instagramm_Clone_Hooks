const Post =require("../models/poste.model")

const createPost=(req,res)=>{
    const {title,body,photo}=req.body
    if (!title ||!body ) {
    return res.json({ error: "please add all fields" });
    } 
    else {
        req.user.password=undefined //bach nkhbo lpassword f frontEnd
        const post=new Post({title,body,photo,postedBy:req.user})
        post.save()
        // .then(()=>{ res.json(post);})//{"_id":"","photo":"",..}
        .then((post)=>{ res.json({post});})
        .catch(error=>console.log(error))
    }
}
const allPosts=(req,res)=>{
    Post.find()
    .populate("postedBy","_id name photo")//bhal jointure bin deux table Post and User
    .populate("comments.postedBy","_id name") //bach kol comment tl3 lina smia dyalo
    .sort("-createdAt") //trtib mn jdid l9dim
    .then(allPosts=>{ res.json({allPosts});})
    .catch(error=>console.log(error))
}
const getsubpost=(req,res)=>{
    // if postedBy in following
    Post.find({postedBy:{$in:req.user.following}})//hada jay mn backend hint req.user fih {model user kamlo}
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(getsubpost=>{
        res.json({getsubpost})
    })
    .catch(err=>{
        console.log(err)
    })
  }
const myPosts=(req,res)=>{
    Post.find({postedBy:req.user._id}) //hint fiha methode requiredLogin plus bghina all posts dyal whd user/_idUser 
    .populate("postedBy","_id name photo")
    .populate("comments.postedBy","_id name")
    .then(myPosts=>{ res.json({myPosts});})
    .catch(error=>console.log(error))
}
const like=(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}},{
            new:true
        })
        .populate("comments.postedBy","_id name ")
        .populate("postedBy","_id name photo") //bach tban lina name,photo mn ndiro like 
        .exec((err,result)=>{
            if (err) {
            return res.json({error:err})
            } else {
                 res.json(result);
            }
        })
}
const unlike=(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}},{
            new:true
        })
        .populate("comments.postedBy","_id name ")
        .populate("postedBy","_id name photo") //bach tban lina name,photo mn ndiro unlike 
        .exec((err,result)=>{
            if (err) {
            return res.json({error:err})
            } else {
                 res.json(result);
            }
        })
}
const comment=(req,res)=>{
    const comment={
        text:req.body.text,// req.body.text kayjina mn frontend
        postedBy:req.user._id// req.user._id kayjina ghir mn backend hint fiha methode requiredLogin 
    }
    Post.findByIdAndUpdate(req.body.postId,{ //req.body.postId kayjina mn frontend
        $push:{comments:comment}},{
            new:true
        })
        .populate("comments.postedBy","_id name") 
         .populate("postedBy","_id name photo")
        .exec((err,result)=>{
            if (err) {
            return res.json({error:err})
            } else {
                 res.json(result);
            }
        })
}
const deletePost=(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.json({error:err})
        }
        //mn 79i nmsah ghir les post dyawli
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
}

module.exports={
    createPost,
    allPosts,
    myPosts,
    like,unlike,
    comment,
    deletePost,
    getsubpost
}