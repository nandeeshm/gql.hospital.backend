import logger from '@logger';

import mongodb from './mongoose';

interface MongoDBOptions {
    useNewUrlParser: boolean;
    reconnectTries: number;
    reconnectInterval: number;
};

const MONGO_USER = (process.env.MONGO_USER) ? process.env.MONGO_USER : '';
const MONGO_PASS = (process.env.MONGO_PASS) ? process.env.MONGO_PASS : '';
const MONGO_HOST = (process.env.MONGO_HOST) ? process.env.MONGO_HOST : '';
const MONGO_PORT = (process.env.MONGO_PORT) ? process.env.MONGO_PORT : '';
const MONGO_DB = (process.env.MONGO_DB) ? process.env.MONGO_DB : '';
const MONGO_OPTIONS_USE_NEW_URL_PARSER = process.env.MONGO_OPTIONS_USE_NEW_URL_PARSER === 'true';
const MONGO_OPTIONS_RECONNECT_TRIES = (process.env.MONGO_OPTIONS_RECONNECT_TRIES) ? Number.parseInt(process.env.MONGO_OPTIONS_RECONNECT_TRIES) : 0;
const MONGO_OPTIONS_RECONNECT_INTERVAL = (process.env.MONGO_OPTIONS_RECONNECT_INTERVAL) ? Number.parseInt(process.env.MONGO_OPTIONS_RECONNECT_INTERVAL) : 0;

const connect = async () => {
    let uri: string = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
    let options = {
        useNewUrlParser: MONGO_OPTIONS_USE_NEW_URL_PARSER,
        reconnectTries: MONGO_OPTIONS_RECONNECT_TRIES,
        reconnectInterval: MONGO_OPTIONS_RECONNECT_INTERVAL
    }

    try {
        let connection = await mongodb.connect(uri, options);
        if (null !== connection) {
            logger.info('MongoDB - DDBB connection successfully stablished.');
        } else {
            logger.fatal('MongoDB - Connection NOT stablished.');
        }
    } catch(error) {
        logger.fatal(`MongoDB - ${error.message}`);
    }
};

export default connect;