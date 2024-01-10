
const asyncHandler=require("express-async-handler")
const User= require("../schema/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config();


// @desc Register a User
// @route POST/api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 20);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email,name:username });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

// @desc Login a User
// @route POST/api/users/register
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!password||!email){
        res.status(400);
        throw new Error("Enter the password and email")
    }
    const user= await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
            username:user.username,
            email:user.email,
            id:user.id
        },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"})
        res.status(200).json({accessToken});

    }
    else{
        res.status(401);
        throw new Error("email or password didnt match")
    }
  res.json({message :"Login  User"})
});

// @desc Current User Info
// @route POST/api/users/register
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports={registerUser,loginUser,currentUser}