import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mergedTypeDefs from "./typedefs/index.js"
import mergedResolers from "./resolvers/index.js"
import dotenv from "dotenv"
import {connectDB} from "./db/connectdb.js"
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import {buildContext} from "graphql-passport"
import { configurePassport } from "./passport/passport.config.js";


dotenv.config()
configurePassport()

const app = express();
const httpServer = http.createServer(app);
const mongoDBStore= connectMongo(session)
const store = new mongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "sessions"
})
store.on("error",(err) => {
    console.log(err)
})

app.use(
    session({
        secret: process.env.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
        },
        store:store
    })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
await server.start();
app.use(
    '/graphql',
    cors({
        origin: "http://localhost:5173",
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req,res }) => buildContext({ req,res }),
    }),
);

await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

await connectDB()
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
