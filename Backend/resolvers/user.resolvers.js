import { users } from "../dummyData/data.js"

const userResolvers = {
    Query: {
        users: ()=>{
            return users
        }
    },
    mutation:{}
}

export default userResolvers