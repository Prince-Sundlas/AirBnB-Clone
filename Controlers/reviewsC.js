const path = require("path");
const {lschema , rschema} =require("../joi.js");
const { type } = require("os");
const { number } = require("joi");
const methodOverride = require('method-override');
const expresserror = require("../error.js");
let {listing, review} = require("../models/models.js");
const { Model } = require("mongoose");
module.exports.addRev = async (req,res)=>{
    let list = await listing.findById(req.params.id);
    let up = rschema.validate(req.body);
    if(up.error){
            throw new expresserror(404, up.error);
        }
    let rev = new review(req.body);
    rev.author = req.user._id;
    list.reviews.push(rev._id);
    await list.save();
    await rev.save();
    return res.redirect(`/listings/view/${req.params.id}`);
}
module.exports.destroyRev = async (req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/view/${id}`);
}