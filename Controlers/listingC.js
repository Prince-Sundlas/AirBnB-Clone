const {listing} = require("../models/models");
const path = require("path");
const {lschema , rschema} =require("../joi.js");
const { type } = require("os");
const { number } = require("joi");
const methodOverride = require('method-override');
const expresserror = require("../error.js");
module.exports.main = async (req,res)=>{
    return res.render("./listings/main.ejs");}
module.exports.index = async(req, res, next) => {
    try {
        let all_list = await listing.find({});
        return res.render("./listings/index.ejs", {all_list});
    } catch (err) {
        next(err);
    }
}
module.exports.show = async (req, res, next) => {
    try {
        let id = req.params.id;
        let list = await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
        if (!list) {
            req.flash("error","Your requested listing does not exists!!");
            res.redirect("/listings");
        }
        return res.render("./listings/show.ejs", {list});
    } catch (err) {
        next(err);
    }
}
module.exports.New = (req, res) => {
    return res.render("./listings/new.ejs");
}
module.exports.create =  async(req, res, next) => {
    try {
        let url = req.file.path;
        let up = lschema.validate(req.body);
        if(up.error){
            throw new expresserror(404, up.error);
        }
        req.flash("success","A new Listing is succesfully added!!");
        const newlist = new listing(req.body);
        newlist.owner = req.user._id;
        newlist.imgurl= url;
        await newlist.save();
        return res.redirect("/listings");
    } catch (err) {
        next(err);
    }
}
module.exports.editform = async(req, res, next) => {
    try {
        let id = req.params.id;
        let list = await listing.findById(id);
        if (!list) {
            throw new expresserror(404, "Listing not found");
        }
        return res.render("./listings/Edit.ejs", {list});
    } catch (err) {
        next(err);
    }
}
module.exports.edit = async (req, res, next) => {
    try {
        let id = req.params.id;
        let up = lschema.validate(req.body);
        if(up.error){
            throw new expresserror(404, up.error);
        }
        req.flash("success","The Listing is succesfully Updated!!");
        const result = await listing.updateOne({ _id: id }, req.body);
        if(req.file){
            let url = req.file.path;
            let list = await listing.findById(id);
            list.imgurl = url ;
            await list.save();
        }
        if (result.matchedCount === 0) {
            throw new expresserror(404, "Listing not found");
        }
        return res.redirect(`/listings/view/${id}`);
    } catch (err) {
        next(err);
    }
}
module.exports.destroyRoute = async (req, res, next) => {
    try {
        const result = await listing.findOneAndDelete({ _id: req.params.id });
        if (!result) {
            throw new expresserror(404, "Listing not found");
        }
        req.flash("success","The Listing is succesfully deleted!!");
        return res.redirect("/listings");
    } catch (err) {
        next(err);
    }
}