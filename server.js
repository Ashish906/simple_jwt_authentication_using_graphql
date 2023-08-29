import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'

import { AsyncHandler } from './src/resolvers/utils/index.js'
import typeDefs from './src/schemas/index.js'
import resolvers from './src/resolvers/index.js'
import { authHelper } from './src/resolvers/helpers.js'
import connectDb from './config/db.js'

// To use environment veriables
dotenv.config({
    path: 'config/.env'
})

const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app)

const startServer = AsyncHandler.default(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: process.env.NODE_ENV !== 'production'
    })
    // Note need to call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start()

    // Connect db
    connectDb(process.env.MONGO_URL)

    // Specify the path where we'd like to mount our server
    app.use(
        '/api/v1',
        cors(),
        express.json(),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: ({ req }) => authHelper.getContextOfRequest(req),
        })
    )

    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000/`)
})

startServer()