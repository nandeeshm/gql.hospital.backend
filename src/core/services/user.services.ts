import logger from "@logger";

import { 
    User,
    NewUserIdentificationData
} from '@entities/User';

import * as ports from '@ports';

// ###############################################################
// ##########          CREATING OPERATIONS              ##########
// ###############################################################

const _createNewUserCardId = (): string => {
    let charStructure = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let generatedNumber = '79'.concat(_createRandomStringOfNumbers(7));
    let charPosition = parseInt(generatedNumber, 10) % 23;
    let selectedChar = charStructure.substring(charPosition, charPosition + 1);
    
    return generatedNumber.concat(selectedChar);
};

const _createNewUserSocialCareNumber = ():string => {
    return '38'.concat(_createRandomStringOfNumbers(10));
};

const _createRandomStringOfNumbers = (amountOfNumbers: number = 0): string => {
    return Array
        .from(
            { length: amountOfNumbers },
            () => Math.floor(Math.random() * (9 - 0))
        )
        .join('');
};

// TODO: Before returning the new user's identification data, check the DDBB in order to verify that
//  the created values has not been applied yet. It means, the are available.
const generateNewUserIdentificationData = (): NewUserIdentificationData => {
    return {
        idCard: _createNewUserCardId(),
        socialCareNumber: _createNewUserSocialCareNumber()
    };
};

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
    generateNewUserIdentificationData,
    checkIfUserExists,
    parseUserFromDatabase
}