import logger from "@logger";

import { fieldIdConverter, parseIdFieldForSingleObject } from '../common/fieldIdConverter';
import { connect, disconnect, models } from '@mongodb';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

// REFACTOR: (201800825) - (users.requests.js) - The 'getUserById' method could be removed due to the use of 'getUsersData' one from other layers.
const getUserById = async (userId: string) => {
    logger.trace('getUserById database for ID:', userId);
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');
        await connect();

        let criteria = { _id: fieldIdConverter['userId'](userId) };
        let projection = { 'locale': 0 };
        let result = await models.UserModel.findOne(criteria, projection).lean().exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(getUserById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    } finally {
        await disconnect();
    }
};

export {
    getUserById
};