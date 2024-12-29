import { users } from "../dummyData/data.js"
import user from "../models/user.model.js"
import bcrypt from "bcryptjs"
const userResolvers = {
    Mutation:{
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

                // https://avatar-placeholder.iran.liara.run
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new user({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender == "male" ? boyProfilePic : girlProfilePic
                })
                
                await newUser.save()

                await context.login(newUser)
                return newUser
            } catch (error) {
                console.log("error in signup",error)
                throw new Error(error.message || "Internal server Error")
            }
        },

        login: async(_,{input}, context)=> {
            try {
                const {username, password} = input
                const {user} = await context.authenticate("graphql-local", {username,password})

                await context.login(user)
                return user
            } catch (error) {
                console.log("Error in login", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        
        logout: async(_,__,context) => {
            try {
                await context.logout()
                req.session.destroy((err) => {
                    if(err) throw err
                })
                res.clearCookie("connect.sid")
                return {message:"Logout sucessfully"}
            } catch (error) {
                console.log("Error in logout", error)
                throw new Error(error.message || "Internal server error")
            }
        }
    },
    Query: {
        authUser: async(_,__,context)=>{
            try {
                const user = await context.getUser()
                return user
            } catch (error) {
                console.log("error in authUser", error)
                throw new Error(error.message || "Internal server error")
            }
        },

        user: async(_,{userId}) => {
            try {
                const user = await user.findById(userId)
                return user
            } catch (error) {
                console.log("error in user Query", error)
                throw new Error(error.message || "Internal server error")
            }
        }
    },
    
}

export default userResolvers