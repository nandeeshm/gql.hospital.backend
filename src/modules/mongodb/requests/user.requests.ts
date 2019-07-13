import logger from "@logger";

import { 
    fieldIdConverter
} from '../common/fieldIdConverter';
import { models } from '@mongodb';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getUserById = async (userId: string) => {
    logger.trace('Getting user by ID:', userId);
    try {
        let criteria = { _id: fieldIdConverter['userId'](userId) };
        let projection = { 'locale': 0 };
        return await models.UserModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getUserById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const getUserByUsername = async (username: string) => {
    try {
        let criteria = { username };
        let projection = { 'locale': 0 };
        return await models.UserModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getUserByUsername) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const getUserByToken = async (token: string) => {
    try {
        let criteria = { token };
        let projection = { 'locale': 0 };
        return await models.UserModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getUserByUsername) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const checkIfUserExists = async (searchingParam: string, paramValue: string) => {
    try {
        let criteria = JSON.parse(`{ "${searchingParam}": "${paramValue}" }`);
        return await models.UserModel.findOne(criteria).lean().exec();
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateUserToken = async (userId: string, newToken: string) => {
    try {
        return await models
            .UserModel
            .findByIdAndUpdate(
                fieldIdConverter['userId'](userId), 
                { token: newToken }, 
                { new: true })
            .lean()
            .exec();
    } catch (error) {
        logger.error(`(updateUserToken) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const updateUserLoginData = async (userId: string, newToken: string) => {
    try {
        return await models
            .UserModel
            .findByIdAndUpdate(
                fieldIdConverter['userId'](userId), 
                { token: newToken, lastLoginAt: new Date() }, 
                { new: true })
            .lean()
            .exec();
    } catch (error) {
        logger.error(`(updateUserToken) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

export {
    getUserById,
    getUserByUsername,
    getUserByToken,
    checkIfUserExists,
    updateUserToken,
    updateUserLoginData
};