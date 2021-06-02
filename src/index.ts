import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import DBconn from "./dbConnect"
import { HelloResolver } from "./resolver/hello"
import { PostResolver } from "./resolver/Post"
import cors from "cors"
import { ProjectResolver } from "./resolver/Project"


const main = async () => {
    const app = express()
    // 
    DBconn()
    app.use(
        cors({
            origin: 'https://halim.tech',
            //credentials: true
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, ProjectResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({
        app, cors: false,
    })

    app.listen(process.env.PORT, () => {
        console.log(`🚀 server running @8080`);

    })
}

main()