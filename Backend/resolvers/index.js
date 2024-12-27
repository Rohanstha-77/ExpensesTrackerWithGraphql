import { mergeResolvers } from "@graphql-tools/merge";
import trasactionResolver from "./transaction.resolvers.js";
import userResolvers from "./user.resolvers.js";

const mergedResolvers = mergeResolvers([trasactionResolver,userResolvers])

export default mergedResolvers