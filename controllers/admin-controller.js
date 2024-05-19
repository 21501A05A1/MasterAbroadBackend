const User=require("../models/user-model")
const Contact=require("../models/contact-model")
const Post=require("../models/post-model")
const getAllUsers=async(req,res)=>{
try{
 const users=await User.find({},{password:0});
 console.log(users)
 if(!users || users.length==0)
 {
    return res.status(404).json({message:"no users found"})
 }
 return res.status(200).json(users);
}catch(error){
console.log(error)
}
}

const updateUserById=async(req,res)=>{
   try{
     const id=req.params.id;
     const updateUserData=req.body;
     const updatedData=await User.updateOne({_id:id},{
      $set:updateUserData,
     })
   return res.status(200).json(updatedData);
   }catch(error){
   next(error)
   }
}

const deleteUserById=async(req,res)=>{
  try{
   const id=req.params.id;
   await User.deleteOne({_id:id});
   return res.status(200).json({message:"user deleted successfully"})
  }catch(error){
  next(error)
  }
}

const getUserById=async(req,res)=>{
   try{
    const id=req.params.id;
    const data=await User.findOne({_id:id},{password:0})
    return res.status(200).json(data)
   }catch(error){
   next(error)
   }
 }

const getAllContacts=async(req,res)=>{
    try{
        const contacts=await Contact.find();
        console.log(contacts)
        if(!contacts || contacts.length==0)
        {
           return res.status(404).json({message:"no contacts found"})
        }
        return res.status(200).json(contacts);
       }catch(error){
       console.log(error)
       }
}

const deleteContactById=async(req,res)=>{
   try{
    const id=req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({message:"contact deleted successfully"})
   }catch(error){
   next(error)
   }
 }

 const getAllPosts=async(req,res)=>{
   try{
    const posts=await Post.find({},{description:0});
    console.log(posts)
    if(!posts || posts.length==0)
    {
       return res.status(404).json({message:"no posts found"})
    }
    return res.status(200).json(posts);
   }catch(error){
   console.log(error)
   }
   }

   const deletePostById=async(req,res)=>{
      try{
       const id=req.params.id;
       await Post.deleteOne({_id:id});
       return res.status(200).json({message:"post deleted successfully"})
      }catch(error){
      next(error)
      }
    }

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById,getAllPosts,deletePostById};