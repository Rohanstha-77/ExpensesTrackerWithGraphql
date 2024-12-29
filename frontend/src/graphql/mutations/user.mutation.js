import { gql } from "@apollo/client";

export const SIGNUP = gql`
    mutation signUp($input: signUpInput!){
        signUp(input: $input){
            _id
            name
            username
        }
    }
`