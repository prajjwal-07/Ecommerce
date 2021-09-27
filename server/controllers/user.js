const User  = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

exports.signup = async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        //check for email already exist
        const user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "The email already exists."});

        // Password hashing
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, password: passwordHash
        });

        // Save in database
        await newUser.save();

        // create tokens
        const accesstoken = createAccessToken({id: newUser._id})
        const refreshtoken = createRefreshToken({id: newUser._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })

        res.status(201).json({
            accesstoken,
            msg:"user created"
        })
        
    } catch (error) {
        return res.status(500).json({msg: err.message})
        
    }

}

exports.login = async (req, res) => {
    try {
        const {email, password} =req.body;

        //check if email exist
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"email does not exist."});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({msg: "Incorrect password."});
        }

        //user found. assign tokens
        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 
        })

        res.status(201).json({
            accesstoken,
            msg:"user login"
        })
        
    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
}

exports.logout = async (req, res) =>{
    try {
        //clear the refresh token
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
        return res.json({msg: "Logged out"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.refreshToken = (req, res) =>{
    try {
        const rf_token = req.cookies.refreshtoken;
        //console.log(rf_token);
        if(!rf_token) return res.status(400).json({msg: "Refresh token expire"});

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).json({msg: "Please Login or Register"})

            const accesstoken = createAccessToken({id: user.id})

            res.json({accesstoken})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
}