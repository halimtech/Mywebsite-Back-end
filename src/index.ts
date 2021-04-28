import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import DBconn from "./dbConnect"
import { HelloResolver } from "./resolver/hello"
import { PostResolver } from "./resolver/Post"
import cors from "cors"


const main = async () => {
    const app = express()

    DBconn()
    app.use(
        cors({
            origin: 'http://127.0.0.1:3000',
            //credentials: true
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({
        app, cors: false,
    })

    app.listen(8080, () => {
        console.log(`🚀 server running @3000`);

    })
}

main()