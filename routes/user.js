const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
const expresserror = require("../error.js");
const passport = require("passport");
const {urlAccess} = require("../middleware.js");
const { signUp, signUpProceed, login, loginProceed, logout } = require("../Controlers/userC.js");
router
    .route("/signup")
    .get(signUp)
    .post(urlAccess ,signUpProceed);
router 
    .route("/login")
    .get(login)
    .post(urlAccess ,passport.authenticate('local' ,{ failureRedirect: '/login',failureFlash:true }) ,loginProceed);
router.get("/logout",logout);
module.exports = router;