const {Schema,model}=require("mongoose");
const serviceSchema=new Schema({
    service:{type:String,required:true}
})