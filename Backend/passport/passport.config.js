import passport from "passport";
import bcrypt from "bcryptjs"
import user from "../../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async(id,done) => {
        try {
            const user = await user.findById(id)
            done(null,user)
        } catch (error) {
            done(error)
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async(username,password,done) => {
            try {
                const user = await user.findOne({username})
                const validPassword = await bcrypt.compare(password, user.password) 
                if(!user || !validPassword){
                    throw new Error("Invalid Username or password")
                }
                return done(null,user)
            } catch (error) {
                return done(error)
            }
        })
    )
}