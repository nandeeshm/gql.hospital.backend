const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                exclude: [path.resolve(__dirname, '../node_modules')],
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                exclude: /node_modules/,
                test: /\.graphql$/,
                use: [{ loader: 'graphql-import-loader' }]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@logger': path.resolve(__dirname, '../src/core/common/logger'),
            '@services': path.resolve(__dirname, '../src/core/services/'),
            '@apiErrors': path.resolve(__dirname, '../src/core/models/ApiError'),
            '@entities': path.resolve(__dirname, '../src/core/entities/'),
            '@resolvers': path.resolve(__dirname, '../src/modules/graphql/resolvers'),
            '@mongodb': path.resolve(__dirname, '../src/modules/mongodb')
        }
    },
    target: 'node'
};