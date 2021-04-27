import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import DBconn from "./dbConnect"
import { HelloResolver } from "./resolver/hello"


const main = async () => {
    const app = express()

    DBconn()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({
        app, cors: false,
    })

    app.listen(3000, () => {
        console.log(`🚀 server running @3000`);

    })
}

main()