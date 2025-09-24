const express = require("express");
const router = express.Router();
const multer  = require('multer');
const {storage} = require("../Cloudconfig.js");
const upload = multer({ storage });
const data = require("../data.js");
const {lschema , rschema} =require("../joi.js");
const methodOverride = require('method-override');
const expresserror = require("../error.js");
const {userinfo} = require("../middleware.js");
let {listing , review} = require("../models/models.js");
const { findById, populate } = require("../models/usermodel.js");
const {authorisation} = require("../middleware.js");
const { index, show ,New, create, editform, edit, destroyRoute } = require("../Controlers/listingC.js");
router.route("/")
.get(index)
.post(userinfo,upload.single("imgurl"),create);
router.route("/view/:id")
.get(show)
.put(authorisation,upload.single("imgurl") ,edit)
.delete(userinfo,authorisation, destroyRoute);
router.get("/new",userinfo, New);
router.get("/:id/edit",userinfo, editform);
module.exports = router;