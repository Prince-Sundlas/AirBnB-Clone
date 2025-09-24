const express = require("express");
const router = express.Router({mergeParams : true});
const data = require("../data.js");
const path = require("path");
const {lschema , rschema} =require("../joi.js");
const { type } = require("os");
const { number } = require("joi");
const methodOverride = require('method-override');
const expresserror = require("../error.js");
const mongoose = require("mongoose");
let {listing, review} = require("../models/models.js");
const { userinfo } = require("../middleware.js");
const { addRev, destroyRev } = require("../Controlers/reviewsC.js");
router.post("/:id/reviews",userinfo,addRev)
router.delete("/:id/reviews/:reviewid",destroyRev);
module.exports = router;