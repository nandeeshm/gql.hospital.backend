// REMOVE the 'plainToClass' import.
import { plainToClass }          from 'class-transformer';

import { UserDoesNotExistError, ApiError } from '@entities/ApiError';
import { User } from '@entities/User';

// REMOVE the 'mockedUsers' structure.
let mockedUsers = plainToClass(
    User,
    [
        {
            id: 'user1',
            name: 'John',
            surname: 'Doe',
            username: 'jhondoe',
            password: '123456',
            role: 3,
            token: '',
            lastLoginAt: new Date(),
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
            lastLoginAt: new Date(),
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
            lastLoginAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ]
);

const getUser = async (userId: string): Promise<User | ApiError> => {
    // TODO access the persisted users and get the selected one by its user ID.
    let obtainedUser = mockedUsers.find(user => user.id === userId);
    return (obtainedUser) ? obtainedUser : new UserDoesNotExistError();
};

// const getUsers = async (): Promise<User[] | undefined> => {
//     return mockedUsers;
// };

export {
    getUser,
    // getUsers
}