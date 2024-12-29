import {gql} from "@apollo/client"


export const GET_AUTH_USER = gql`
    query getAuthUser {
        authUser{
            _id,
            username,
            name,
            profilePicture
        }
    }
`