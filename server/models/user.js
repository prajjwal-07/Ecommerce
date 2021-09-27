const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min: 3,
        max: 20,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user',
    }
    
});

module.exports = mongoose.model("User" , userSchema);
