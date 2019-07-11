import { ApiError } from '@entities/ApiError';
import { User } from '@entities/User';

import * as adapters from '@adapters';

const getUser = async (userId: string): Promise<User | ApiError> => {
    return adapters.getUser(userId);
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getUser,
}