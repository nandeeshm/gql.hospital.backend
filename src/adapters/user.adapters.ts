import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    UserDoesNotExistError,
    UserBadRequestError
} from '@entities/ApiError';
import { User } from '@entities/User';

import { getUserById } from '@dbRequests';

const getUser = async (userId: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await getUserById(userId);
        return (obtainedUser) ? plainToClass(User, obtainedUser) : new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

// const getUsers = async (): Promise<User[] | undefined> => {
//     return mockedUsers;
// };

export {
    getUser,
    // getUsers
}