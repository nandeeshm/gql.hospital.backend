import logger           from '@logger';
import * as path        from 'path';

import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server';
import resolvers        from '@resolvers';

import * as mongodb     from '@mongodb';

const schemaAbsolutePath: string = path.join(process.env.PWD!, 'src/modules/graphql/schema.graphql');
const typeDefs = importSchema(schemaAbsolutePath);

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
    .then(({ url }) => {
        logger.info(`Server ready at ${url}`);
        mongodb.connect();
    });

declare const module: any;
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        server.stop();
        mongodb.disconnect();
    });
}