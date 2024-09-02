const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration

exports.showRegisterPage = async (req, res) => {
    try {
        res.render('register.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hashPassword });
        res.redirect('/api/users/login');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// login

exports.showLoginPage = async (req, res) => {
    try {
        res.render('login.ejs');   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        let matchPassword = await bcrypt.compare(req.body.password,user.password);
        // console.log(matchPassword);  
        if(!matchPassword){
            return res.status(400).json({message:"Email or Password not match"})
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/api/blog/');
    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};
