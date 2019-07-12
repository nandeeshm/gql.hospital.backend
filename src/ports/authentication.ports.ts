import logger from '@logger';

import { ApiError, UserWrongPasswordError, AuthenticationError, LogoutError } from '@entities/ApiError';
import { SimpleResponse } from '@entities/SimpleResponse';
import { LoginInputType, AuthenticatedUser } from "@entities/Athentication";
import { User } from '@entities/User';

import { comparePassword } from '@services/password.services';
import { encodeToken } from '@services/token.services';

import * as adapters from '@adapters';

const login = async (loginData: LoginInputType): Promise<AuthenticatedUser | ApiError> => {
    let persistedUser: User | ApiError;
    let encodedToken: string;

    try {
        logger.trace(`(login) - Looking for user with username '${loginData.username}'.`);

        persistedUser = await adapters.getUserByUsername(loginData.username);

        if (persistedUser instanceof ApiError) {
            logger.error('(login) - User error.', persistedUser.message);
            return persistedUser
        };

        if (await comparePassword(loginData.password, persistedUser.password)) {
            logger.error(`(login) - Password '${loginData.password}' doesn\'t match.`);
            return new UserWrongPasswordError();
        }

        logger.trace('(login) - User exist\'s and its password matchs.');

        logger.trace('(login) - Creating a new token.');
        encodedToken = encodeToken(persistedUser.username, persistedUser.role);

        logger.trace('(login) - Updating user\'s token.');
        persistedUser = await adapters.updateUserLoginData(persistedUser.id, encodedToken);
        
        if (persistedUser instanceof ApiError) {
            logger.error('(login) - Error updating user\'s token.', persistedUser.message);
            return persistedUser
        };

        logger.trace('(login) - User\'s token updated successfully.');
        return new AuthenticatedUser(persistedUser);
    } catch (error) {
        logger.error('Authenticating user.', error.message);
        return new AuthenticationError(error.message);
    }
};

const logout = async (userToken: string): Promise<SimpleResponse | ApiError> => {
    let persistedUser: User | ApiError;

    try {
        logger.trace('(logout) - Looking for user by token');
        persistedUser = await adapters.getUserByToken(userToken);
        if (persistedUser instanceof ApiError) {
            logger.error('(logout) - Token error.', persistedUser.message);
            return persistedUser
        };

        logger.trace('(logout) - User exist\'s.');

        logger.trace('(logout) - Deleting user\'s token.');
        persistedUser = await adapters.updateUserToken(persistedUser.id, '');
        if (persistedUser instanceof ApiError) {
            logger.error('(login) - Error removing user\'s token.', persistedUser.message);
            return persistedUser
        };

        logger.trace('(logout) - User\'s token deleted successfully.');
        return new SimpleResponse();
    } catch (error) {
        return new LogoutError(error.message);
    }
};

export {
    login,
    logout
};