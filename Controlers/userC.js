const User = require("../models/usermodel");
const expresserror = require("../error.js");
const passport = require("passport");
const {urlAccess} = require("../middleware.js");
module.exports.signUp = (req,res)=>{
    res.render("./user/signup.ejs");
}
module.exports.signUpProceed = async (req,res)=>{
    try{
        let {username ,email,password} = req.body;
        let user = new User({username , email});
        regUser = await User.register(user,password);
        console.log(await User.find());
        req.logIn(regUser,(err)=>{
            console.log(err);
            res.locals.redirectUrl = res.locals.redirectUrl || "/listings";
            req.flash("success",`Welcome to AirBnb`);
            res.redirect(res.locals.redirectUrl);
        })
    }
    catch(e){
        req.flash("error",`User Cannot be registerd as ${e.message}`);
        res.redirect("/signup");
    }
    }
module.exports.login = (req ,res)=>{
    res.render("./user/login.ejs");
}    
module.exports.loginProceed = async(req ,res)=>{
    req.flash("success","Welcome to your account");
    res.locals.redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(res.locals.redirectUrl);
}
module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        console.log(err || "Logout succesfully");
    })
    req.flash("success","User is succesfully logged out");
    res.redirect("/listings");
}