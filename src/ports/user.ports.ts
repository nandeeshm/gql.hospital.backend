import { ApiError } from '@entities/ApiError';
import { 
    User,
    NewUserIdentificationData
} from '@entities/User';
import * as UserServices from '@services/user.services';

import * as adapters from '@adapters';

// ###############################################################
// ##########           READING OPERATIONS              ##########
// ###############################################################

// const getUser = async (userId: string): Promise<User | ApiError> => {
//     return await adapters.getUser('_id', userId);
// };

const checkIfUserExists = async (searchingParam: string, paramValue: string): Promise<User | null> => {
    try {
        return await adapters.checkIfUserExists(searchingParam, paramValue);
    } catch (error) {
        throw error;
    }
};

const getNewUserIdentificationData = (): NewUserIdentificationData => {
    return UserServices.generateNewUserIdentificationData();
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    // getUser,
    checkIfUserExists,
    getNewUserIdentificationData
}