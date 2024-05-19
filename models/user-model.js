const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Posts',
        }
    ]
},
{ timestamps: true }
);
userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password'))
    next();
try{
    const saltRound=await bcrypt.genSalt(10);
    const hash_password=await bcrypt.hash(user.password,saltRound);
    user.password=hash_password;
}
catch(error)
{
    next(error);
}
});
userSchema.methods.generateToken=async function(){
  try{
     return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        isAdmin:this.isAdmin,
      },process.env.JWT_SECRET_KEY,{
        expiresIn:"30d",
     });
  }catch(error)
  {
    console.error(error);
  }
}
const User=new mongoose.model("User",userSchema);
module.exports=User;
