import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
       type:String,
       required: true,
       unique: true 
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    gender:{
        type: String,
        enum: ["male","female"]
    }
},{timestamps:true})

const user = mongoose.model("User", userSchema)

export default user