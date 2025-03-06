import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:false},
    image: {type:String,required:false},
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;