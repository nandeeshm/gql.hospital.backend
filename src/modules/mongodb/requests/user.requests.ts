import logger from "@logger";

import { User } from '@entities/User';

import { fieldIdConverter } from '../common/fieldIdConverter';
import { models } from '@mongodb';


// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

// REFACTOR: (201800825) - (users.requests.js) - The 'getUserById' method could be removed due to the use of 'getUsersData' one from other layers.
const getUserById = async (userId: string): Promise<User> => {
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');

        let criteria = { _id: fieldIdConverter['userId'](userId) };
        return await models.User.findOne(criteria).exec();
    } catch (error) {
        logger.error(`(getUserById) - ${error.message} ${error.description}`);
        throw new ApiError.UserGettingDataError((error.description) ? error.description : error.message);
    }
};