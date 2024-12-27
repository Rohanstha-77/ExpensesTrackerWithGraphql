import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        if(conn) return console.log("sucessfully connected")
    } catch (error) {
        console.log(error.message)
    }
}