const {Schema,model,mongoose}=require('mongoose');
const postSchema=new Schema(
    {
    photo:{type:String,required:true},
    description:{type:String,required:true},
    about:{type:String,required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
},
{timestamps:true}
)

const Post=new model("Posts",postSchema);

module.exports=Post;