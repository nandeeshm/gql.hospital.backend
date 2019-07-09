import logger           from '@logger';
import * as path        from 'path';

// import 'reflect-metadata';
import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server';
import resolvers        from '@resolvers';

import * as mongodb     from '@mongodb';

// console.log('>>>>>>>>>>>>', path.join(__dirname, './modules/graphql/schema.graphql'));
// console.log('>>>>>>>>>>>>', path.join(process.env.PWD!, 'src/modules/graphql/schema.graphql'));

const schemaAbsolutePath: string = path.join(process.env.PWD!, 'src/modules/graphql/schema.graphql');


const typeDefs = importSchema(schemaAbsolutePath);
// const typeDefs = importSchema(path.join(__dirname, './modules/graphql/schema.graphql'));

// console.log(typeDefs);


// mongodb.connect();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        token: req.headers.authorization
    }),
    playground: (process.env.NODE_ENV === 'development') ? true : false,
    introspection: (process.env.NODE_ENV === 'development') ? true : false
});

server
    .listen({ port: process.env.SERVER_PORT })
    .then(({ url }) => logger.info(`Server ready at ${url}`));
    

declare const module: any;
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        server.stop();
        // mongodb.disconnect();
    });
}