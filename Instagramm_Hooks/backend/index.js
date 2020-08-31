const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8080;
const { authRoutes } = require("./routes/auth.routes");
const { postRoutes } = require("./routes/postes.routes");
const { userRoutes } = require("./routes/user.routes");
//------------------------------------CNX DB--------------
mongoose.connect("mongodb://localhost:27017/Insta_Pure_Class", { useMongoClient: true, } )
mongoose.connection.on("connected",()=>{console.log("connected to DB Mongodb")})  
mongoose.connection.on("error",(error)=>{console.log("error connection",error)})  
//-------------------------------middlware-------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //extended: true cad json dyalna db ykoun kbir sinon extended: false
//routes 
app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);
//Page Not Found
app.use((req, res, next) => {
  //404 Not Found
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || "Error processing your request";

  res.status(status).send({
    error,
  });
});

//run server
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
