const User=require("../models/userModel")
const generateToken=require('../config/generateToken')

const registerUser = async (req, res) => {
  try{
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({message:"Please enter all the fields"});
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
   return res.status(400).json({message:"User already exists"});
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({message:"Failed to create the user"});
   
  }
}
catch(error)
{
  res.status(500).json({ error: error.message });
}
};

const authUser =async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
}
catch(error)
{
  res.status(500).json({ error: error.message });
}
};
module.exports={registerUser,authUser};