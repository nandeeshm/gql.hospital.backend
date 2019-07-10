import logger from "@logger";

import { 
    fieldIdConverter, 
    parseIdFieldForSingleObject 
} from '../common/fieldIdConverter';
import { models } from '@mongodb';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getUserById = async (userId: string) => {
    logger.trace('Getting user by ID:', userId);
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');
        let criteria = { _id: fieldIdConverter['userId'](userId) };
        let projection = { 'locale': 0 };
        let result = await models.UserModel.findOne(criteria, projection).lean().exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(getUserById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const getUserByUsername = async (username: string) => {
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');
        let criteria = { username };
        let projection = { 'locale': 0 };
        let result = await models.UserModel.findOne(criteria, projection).lean().exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(getUserByUsername) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const getUserByToken = async (token: string) => {
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');
        let criteria = { token };
        let projection = { 'locale': 0 };
        let result = await models.UserModel.findOne(criteria, projection).lean().exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(getUserByUsername) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateUserToken = async (userId: string, newToken: string) => {
    try {
        // validate.users.userId(userId, 'The user\'s ID must be defined in order to get the user data.');
        let result = await models
            .UserModel
            .findByIdAndUpdate(
                fieldIdConverter['userId'](userId), 
                { token: newToken}, 
                { new: true })
            .lean()
            .exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(updateUserToken) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

export {
    getUserById,
    getUserByUsername,
    getUserByToken,
    updateUserToken
};