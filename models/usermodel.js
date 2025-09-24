const { types, required } = require("joi");
const mongoose = require("mongoose");
const pplm = require("passport-local-mongoose");
const userschema = mongoose.Schema({
    email :{
        type : String,
        required : true,
    },
    username :{
        type : String,
    }
})
userschema.plugin(pplm);
module.exports = mongoose.model("User",userschema);