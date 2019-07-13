import { ApiError } from '@entities/ApiError';
import { User } from '@entities/User';

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

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    // getUser,
    checkIfUserExists
}