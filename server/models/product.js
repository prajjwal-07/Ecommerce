const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true,

    },
    category:{
        type: String, 
        ref: 'Category', 
        required: true

    },
    image:{
        type: String,
        required: true
    },

});

module.exports = mongoose.model("Product" , productSchema);