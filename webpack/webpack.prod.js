const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv                 = require('dotenv-webpack');
const merge                  = require('webpack-merge');
const nodeExternals          = require('webpack-node-externals');
const path                   = require('path');
const common                 = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    entry: [path.join(__dirname, '../src/server.ts')],
    externals: [nodeExternals({})],
    mode: 'none',
    plugins: [
        new Dotenv({
            path: './config/production.env'
        }),
        new CleanWebpackPlugin()
    ]
});