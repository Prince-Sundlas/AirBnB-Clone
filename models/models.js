const mongoose = require("mongoose");
const { schema } = require("./usermodel");
const { ref } = require("joi");
let reviewschema = new mongoose.Schema({
    comment : String,
    rating:{
        type : Number,
        min:1,
        max:5,
    },
    createdAt :{
        type: Date,
        default : Date.now(),
    },
    author :{
        type :mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
let listschem = new mongoose.Schema({
    title : {
        type : String
    },
    description :{
        type : String
    },
    imgurl :{
        type : String,
    },
    price :{
        type : Number
    },
    location :{
        type : String 
    },
    country :{
        type :String
    },
    reviews :[
        { type: mongoose.Schema.Types.ObjectId ,
           ref : "review",
        }],
    owner :{
        type :mongoose.Schema.Types.ObjectId,
        ref:"User",
    }    
});
listschem.post("findOneAndDelete",async function(listing){
    if(listing){
        await review.deleteMany({_id:{$in : listing.reviews}});
        console.log(listing);
    }})
let listing = new mongoose.model("listing",listschem);
let review = new mongoose.model("review",reviewschema);
module.exports ={ listing , review };