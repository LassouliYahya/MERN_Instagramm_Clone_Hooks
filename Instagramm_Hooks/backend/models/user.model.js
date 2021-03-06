const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
       required: true
    },
    resetToken: {
      type: String
    },
    expireToken: {
      type: Date
    },
    photo:{
      type:String,
      default:"https://res.cloudinary.com/lassouli/image/upload/v1594108384/aglmuhbc3vrbpjuhd2yj.jpg"
     },
    followers:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
    following:[{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
