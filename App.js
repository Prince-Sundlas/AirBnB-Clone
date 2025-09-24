// requiring important packages
const express = require("express");
const app = express();
const engine = require('ejs-mate');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require("path");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const { type } = require("os");
const { number } = require("joi");
const {main} = require("./Controlers/listingC.js");
if(process.env.NODE_ENV !="Production"){
require("dotenv").config();
}
const MongoStore = require("connect-mongo");

// requiring related files
const User = require("./models/usermodel.js");
const expresserror = require("./error.js");
const data = require("./data.js");
const userRoute = require("./routes/user.js");
const listingRoute = require("./routes/lisitng.js");
const reviewRoute = require("./routes/reviews.js");
let {listing , review} = require("./models/models.js");
const {lschema , rschema} =require("./joi.js");
const { configDotenv } = require("dotenv");
const dblink = process.env.ATLAS_LINK;
const msession = MongoStore.create({ mongoUrl : dblink , ttl: 24 * 24 * 60 * 60, touchAfter : 24 * 60 * 60})

//middlewares 
app.use(methodOverride('_method'));
app.engine('ejs', engine);
const port = 1212;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store : msession,
    secret : process.env.SECRET_CODE,
    saveUninitialized:true,
    resave:false,
    cookie :{
        expires : Date.now() + 14 * 24 * 60 * 60 * 1000,
        maxAge : 14 * 24 * 60 * 60 * 1000,
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req , res ,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.Auser = req.user;
    next();
})
app.use("/",userRoute);
app.use("/listings", listingRoute);
app.use("/listings", reviewRoute);
connectdb()
.then(()=>{
    console.log("connected to database");
    app.listen(port,()=>{
        console.log(`The website is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log("Database connection error:", err);
})
async function connectdb() {
   await mongoose.connect(dblink);
}
app.get("/", main);
app.use((req, res, next) => {
    next(new expresserror(404, "The Requested Page does not Exist"));
});
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    let { status = 500, errormsg = "Something Went Wrong!!" } = err;
    res.status(status).render("error.ejs", { errormsg });
});