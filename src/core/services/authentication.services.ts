// REMOVE the 'plainToClass' import.
import { plainToClass }           from 'class-transformer';

import logger from '@logger';

import {
    AuthenticationError,
    UnathorizedWrongCredentialsError
} from '@apiErrors';
import { 
    AuthenticatedUser,
    AuthenticatedUserUnion
} from '@typeDefs/models/Athentication/authenticated.user.type';
import { User }                   from '@typeDefs/models/User/user.type';

// REMOVE the 'User' import and the 'mockedUsers' structure.
let mockedUsers = [
    {
        id: 'user1',
        name: 'John',
        surname: 'Doe',
        username: 'jhondoe',
        password: '123456',
        role: 3,
        token: '',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'user2',
        name: 'Mike',
        surname: 'Wazowsky',
        username: 'mikewazowsky',
        password: '123456',
        role: 2,
        token: '',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'user3',
        name: 'Jose',
        surname: 'Grillo',
        username: 'pepitogrillo',
        password: '123456',
        role: 1,
        token: '',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

const login = async (username: string, password: string): Promise<typeof AuthenticatedUserUnion> => {
    try {
        // TODO: Get the user's data using its username.
        logger.trace('Looking for user:', username);
        let persistedUser: User | undefined = plainToClass(User, mockedUsers.find(user => user.username === username));
        if (!persistedUser) {
            return new UnathorizedWrongCredentialsError('The provided username doesn\'t match with any recordered user.');
        } 
        logger.trace('User successfully found and type:', JSON.stringify(persistedUser));

        // TODO: Compare both passwords, the persisted and the provided.
        logger.trace('Checking password match...');
        if (persistedUser.password !== password) {
            return new UnathorizedWrongCredentialsError('The provided password doesn\'t match with the user\'s one.');
        }
        logger.trace('Password matches.');
        
        // TODO: Generate the new token and persist it.
        logger.trace('Applying new token...');
        persistedUser.token = 'New token';
        logger.trace('New token successfully applied.');
        logger.trace('Updating last login timestamp...');
        persistedUser.lastLoginAt = new Date();
        logger.trace('Last login timestamp successfully set.');
        // TODO: Return the authenticated user's data.
        return plainToClass(AuthenticatedUser, persistedUser);
    } catch (error) {
        return new AuthenticationError(error.message);
    }
    
};

export {
    login
}