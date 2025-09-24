const {listing} = require("./models/models");
module.exports.userinfo = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.Ourl = req.originalUrl; ; 
      req.flash("error", "Please login to Proceed");
      return res.redirect("/login");
    }
    next(); 
  };
  module.exports.urlAccess = (req,res,next)=>{
    if(req.session.Ourl){
      res.locals.redirectUrl = req.session.Ourl;
    }
    next();
  }
  module.exports.authorisation = async(req,res,next)=>{
    let id = req.params.id;
    const list = await listing.findById(id);
    if(!req.user._id.equals(list.owner._id)){
        req.flash("error","You are not permitted to make changes in this listing");
        return res.redirect(`/listings/view/${id}`);
    }
    next();
  }
  