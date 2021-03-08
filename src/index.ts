import express from 'express';
import { prisma } from './prisma';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';

const app = express();

app.set('port', process.env.PORT || 3000);

// Graphql server

const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true
});

server.applyMiddleware({app});

// Start The Server

app.listen(app.get('port'),() => {
    console.log(`http://localhost:${app.get('port')}/graphql`);

    if (prisma) {
        console.log("Database Conected");
    }
})