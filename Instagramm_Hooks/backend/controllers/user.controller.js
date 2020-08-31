const Post = require("../models/poste.model");
const User = require("../models/user.model");

const getAllUsers = (req, res) => {
  User.find((err, users) => {
    //User.find().then(()=>{res.json()})
    if (err || !users) {
      return res.json({
        error: "No data",
      });
    }
    res.json({ users });
  });
};
const getUser = (req, res, next) => {
  const { user } = req;
  res.send({ user });
};

const updateUser = (req, res) => {
  // User.findById(req.params.id)
  User.findById(req.user._id)
    .then((user) => {
      user.photo = req.body.photo;
      // user.email = req.body.email;
      user
        .save()
        .then((updateUser) => {
          res.json(updateUser);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
const getAutreUser =(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")//jib lia kolchi ila password
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
}
//bhal trigger deux procedurs auw mm temps
  //db ndkhl profil dyalo bach ytl3 lia id dyalo ondir lih followers b id dyali hia lawla bach tzad lih followers 3ndo
  // omn ba3d tkhdm lia procedure tania lhia following tzad 3ndi 3an tari9 id dyalo
  //chof tswira d:/MERN/myProject/INSTAGRAM/follower_following
const follow=(req,res)=>{
  User.findByIdAndUpdate(req.body.followId,{//had id dyal lbghit ntb3o
      $push:{followers:req.user._id}},{//had id dyali
          new:true
      },(err,result)=>{
          if (err) {
          return res.status(422).json({error:err})
          } else {
            User.findByIdAndUpdate(req.user._id,{
              $push:{following:req.body.followId}
              
          },{new:true}).select("-password").then(result=>{
              res.json(result)
          }).catch(err=>{
              return res.status(422).json({error:err})
          })
          }
      })
}
const unfollow=(req,res)=>{
  User.findByIdAndUpdate(req.body.unfollowId,{
      $pull:{followers:req.user._id}
  },{
      new:true
  },(err,result)=>{
      if(err){
          return res.status(422).json({error:err})
      }
    User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
        
    },{new:true}).select("-password").then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })

  }
  )
}
const searchUsers=(req,res)=>{
  let userPattern = new RegExp("^"+req.body.query)
  User.find({email:{$regex:userPattern}})
  .select("_id email photo")//kayjib lina mn user ghir had select
  .then(user=>{
      res.json({user})
  }).catch(err=>{
      console.log(err)
  })
}

module.exports = {
  updateUser,
  getUser,
  getAllUsers,
  getAutreUser,
  follow,unfollow,
  searchUsers
};
