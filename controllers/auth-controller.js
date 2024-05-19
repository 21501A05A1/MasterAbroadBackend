const User=require("../models/user-model");
const Post=require("../models/post-model");
const bcrypt=require("bcryptjs");
const mongoose=require('mongoose');
const posts=require('./post-controller');
const home=async(req,res)=>{
  try{
    res.status(200).send("server is running using router");
  }catch(error)
  {
    console.log(error);
  }
}
const register=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({extraDetails:"email already exist"});
        }
        const usercreated=await User.create({username,email,password});
        console.log(req.body);
        res.status(201).json({msg:usercreated,token:await usercreated.generateToken(),userId:usercreated._id.toString(),});
    }
    catch(error){
        // res.send(500).json({msg:"page not found"});
        next(error);
    }
    
}

const login=async(req,res)=>{
  try{
      const {email, password}=req.body;
      const userExist=await User.findOne({email});
      if(!userExist){
        return res.status(400).json({message:"Invalid credentials"});
      }
    const user=await bcrypt.compare(password,userExist.password);
    if(user)
    {
      res.status(200).json({msg:"login successful",token:await userExist.generateToken(),userId:userExist._id.toString(),});
    }
    else
    {
      res.status(401).json({message:"invalid email or password"});
    }
  }
  catch(error){
    res.send(500).json({msg:"page not found"});
}
};

const user=async(req,res)=>{
  try{
      const userData=req.user;
      console.log(userData);
      return res.status(200).json({userData});
     
  }
  catch(error)
  {
    console.log(`error from the user route ${error}`);
  }
}
// const userpost = async (req, res) => {
//   try {
//     const { photo, description,userid } = req.body;
//     if(!photo || !description || !userid){
//       return res.status(400).send({
//         success:false,
//         message:'please provide all fields'
//       })
//     } // Destructure userId, photo, and description from the request body
//     const existingUser=await User.findById(userid);
//     if(!existingUser){
//       return res.status(404).send({
//         success:false,
//         message:'unable to find user'
//       })
//     }
//     const newPost = new Post({ photo, description}); // Create a new post with the provided userId
//     const session=await mongoose.startSession();
//     session.startTransaction()
//     await newPost.save({session})
//     existingUser.posts.push(newPost)
//     await existingUser.save({session})
//     await session.commitTransaction();
//     await newPost.save();
//     console.log("New Post:", newPost);
//     return res.status(200).json(newPost);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const userpost = async (req, res) => {
//   try {
//     const { photo, description } = req.body;
//     const userId = req.user.userId; // Assuming you have stored user ID in req.user from middleware
//     console.log(userId);
//     if (!photo || !description || !userId) {
//       return res.status(400).send({
//         success: false,
//         message: 'Please provide all fields including userId'
//       })
//     }

//     const existingUser = await User.findById(userId);
//     if (!existingUser) {
//       return res.status(404).send({
//         success: false,
//         message: 'Unable to find user'
//       })
//     }

//     const newPost = new Post({ photo, description, userid: userId }); // Include userid when creating a new post
//     await newPost.save();

//     existingUser.posts.push(newPost);
//     await existingUser.save();

//     console.log("New Post:", newPost);
//     return res.status(200).json(newPost);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const userpost = async (req, res) => {
  try {
    const { photo, description,about } = req.body;
    const userId = req.user.userId;

    if (!photo || !description ||!about|| !userId) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields including userId'
      });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'Unable to find user'
      });
    }

    const newPost = new Post({ photo, description,about, user: userId });
    await newPost.save();

    // Push the new post's ObjectId into the user's blogs array
    existingUser.blogs.push(newPost._id); // Assuming newPost._id is the ObjectId of the newly created post
    await existingUser.save();

    console.log("New Post:", newPost);
    return res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports={home,register,login,user,userpost};
