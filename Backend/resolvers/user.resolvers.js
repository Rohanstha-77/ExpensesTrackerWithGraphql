import { users } from "../dummyData/data.js"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
const userResolvers = {
    mutation:{
        signUp: async(_,{input}, context) => {
            try {
                const {username,name,password,gender} = input
                if(!username||!password||!name||!gender){
                    throw new Error ("Field Shouldnt be empty")
                }
                const existingUser = await user.findOne({username})
                if(existingUser){
                    throw new Error("User already exists")
                }

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password,salt)
                
            } catch (error) {
                
            }
        }
    },
    Query: {
        users: ()=>{
            return users
        }
    },
}

export default userResolvers