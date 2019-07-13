import logger from "@logger";

import { 
    fieldIdConverter
} from '../common/fieldIdConverter';
import { User } from '@entities/User';
import { models } from '@mongodb';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewUser = async (newUserData: User) => {
    logger.trace('(ddbb) - Persisting a new user ...');
    try {
        let persistedUser = await models
            .UserModel
            .create(newUserData);
        logger.info('(ddbb) - New user successfully persisted with ID:', persistedUser._id);
        return persistedUser;
    } catch (error) {
        logger.error(`(ddbb - createNewUser) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getUser = async (searchingParam: string, paramValue: string) => {
    logger.trace(`(ddbb) Getting user by '${searchingParam}': ${paramValue}`);
    try {
        let criteria = JSON.parse(`{ "${searchingParam}": "${paramValue}" }`);
        let projection = { 'locale': 0 };
        return await models.UserModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getUserById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

const getUserById = async (userId: string) => {
    logger.trace('(ddbb) Getting user by ID:', userId);
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

// REFACTOR this method could be moved from here to the User or Patient codes.
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
    createNewUser,
    getUser,
    getUserById,
    getUserByUsername,
    getUserByToken,
    checkIfUserExists,
    updateUserToken,
    updateUserLoginData
};