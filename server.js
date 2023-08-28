const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { json } = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const http = require('http')

const { AsyncHandler } = require('./utils')
const typeDefs = require('./src/schemas')
const resolvers = require('./src/resolvers')
const { authHelper } = require('./src/resolvers/helpers')

// To use environment veriables
dotenv.config({
    path: 'config/.env'
})

const app = express()
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const startServer = AsyncHandler(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: process.env.NODE_ENV !== 'production'
    })
    // Note need to call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start()

    // Specify the path where we'd like to mount our server
    app.use(
        '/api/v1',
        cors(),
        json(),
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