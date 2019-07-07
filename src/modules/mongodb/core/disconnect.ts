import logger from '@logger';

import mongodb from './mongoose';

const disconnect = async () => {
    await mongodb.disconnect();
    logger.info('(disconnect) - DDBB connection successfully closed.');
};

export default disconnect;