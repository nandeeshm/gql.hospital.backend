import logger           from '@logger';
import * as path        from 'path';

import { writeFile }    from 'fs';

import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server';
import resolvers        from '@resolvers';

// console.log('>>>>>>>>>>>>', path.join(__dirname, './modules/graphql/schema.graphql'));
// console.log('>>>>>>>>>>>>', path.join(process.env.PWD!, 'src/modules/graphql/schema.graphql'));

const schemaAbsolutePath: string = path.join(process.env.PWD!, 'src/modules/graphql/schema.graphql');


const typeDefs = importSchema(schemaAbsolutePath);
// const typeDefs = importSchema(path.join(__dirname, './modules/graphql/schema.graphql'));

// console.log(typeDefs);

if (process.env.NODE_ENV === 'development') {
    let filePath: string = path.join(process.env.PWD!, 'src/modules/prisma/datamodel.prisma');
    let fileContent: string = typeDefs
        .replace(/type (Query|Mutation).{\n([^}]+)\n}/, '')
        .replace(/scalar \S*\n/, '')
        .replace(/.*union .*\n?/, '');

    console.log(fileContent);
    

    writeFile(
        filePath,
        fileContent,
        (error) => { 
            if (error) {
                logger.error('Creating the datamodel.prisma file.', error.message);
            } else {
                logger.trace('datamodel.prisma file created successfully.');
            }
        }
    );
}

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
    });
}