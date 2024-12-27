import {mergeTypeDefs} from "@graphql-tools/merge"

import userTypeDefs from "./user.typedefs.js"
import transactionTypeDef from "./transaction.typedefs.js"

const mergedTypeDefs = mergeTypeDefs([userTypeDefs,transactionTypeDef])

export default mergedTypeDefs