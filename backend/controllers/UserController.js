import userModel from "../model/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

//  User Data
const userData = async (req,res) => {
    const {email} = req.body;
    try{
        const user = await userModel.findOne({email});
        res.json({success:true,data:{email:user.email,name:user.name,image:user.image}})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Update User Data
const updateUserData = async (req,res) => {
    try {
        const { name, email } = req.body;
        let imageUrl = req.file ? `${req.file.filename}` : undefined;
        
        const updateFields = { name };
        if (imageUrl) {
            updateFields.image = imageUrl; 
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            updateFields,
            { new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ error: "User not found" });
        }
    
        return res.json({success:true,data:{email:updatedUser.email,name:updatedUser.name,image:updatedUser.image},message:"User Data updated successfully"})
      } catch (error) {
        console.error("Error updating user:", error);
    }
}

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    let image_filename = req.file ? req.file.filename : null;
    
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            email: email,
            password: hashedPassword,
            name: name,
            image: image_filename,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token});

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {loginUser, registerUser, userData, updateUserData};