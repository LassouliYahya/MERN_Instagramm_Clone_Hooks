const express = require('express');

const { signUp, logIn,resetPassword,newPassword
} = require("../controllers/auth.controller")

const authRoutes = express.Router();
authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/new-password", newPassword);


module.exports = {
  authRoutes
}