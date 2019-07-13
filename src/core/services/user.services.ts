import logger from "@logger";

import { User } from '@entities/User';

import * as ports from '@ports';

// ###############################################################
// ##########           READING OPERATIONS              ##########
// ###############################################################

const checkIfUserExists = async (searchingParam: string, paramValue: string): Promise<User | null> => {
    try {
        return await ports.checkIfUserExists(searchingParam, paramValue);
    } catch (error) {
        logger.error('(service) Checking if user already existis.', error.message);
        throw error;
    }
};

// ###############################################################
// ##########           PARSING OPERATIONS              ##########
// ###############################################################

const parseUserFromDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

export {
    checkIfUserExists,
    parseUserFromDatabase
}