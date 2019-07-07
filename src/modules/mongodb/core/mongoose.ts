import logger from '@logger';

import mongoose = require('mongoose');
import * as bluebird from 'bluebird';

mongoose.Promise = bluebird;

mongoose.connection.on('error', error => {
    logger.error('Mongoose connection.', error.message);
});

const mongodb = mongoose;

export default mongodb;