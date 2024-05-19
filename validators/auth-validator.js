const {z}=require("zod");



const signupSchema=z.object({
    username:z.string({required_error:"name is required"}).trim().min(3,{message:"name must be atleast 3 chars"}).max(255,{message:"name should be not more than 255 chars"}),
    email:z.string({required_error:"email is required"}).trim().email({message:"invalid email"}).min(3,{message:"email must be atleast 3 chars"}).max(255,{message:"email should be not more than 255 chars"}), 
    password:z.
    string({required_error:"password is required"}).min(6,{message:"password must be atleast 6 chars"}).max(1024,{message:"password should be not more than 1024 chars"}), 
});
module.exports=signupSchema;