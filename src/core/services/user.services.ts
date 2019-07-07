// REMOVE the 'plainToClass' import.
import { plainToClass }          from 'class-transformer';

import { UserDoesNotExistError } from '@apiErrors';
import { User, UserSearchUnion } from '@typeDefs/models/User/user.type';

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
    ]
);

// const getUser = async (userId: string): Promise<User | UserDoesNotExistError> => {
const getUser = async (userId: string): Promise<typeof UserSearchUnion> => {
    // TODO access the persisted users and get the selected one by its user ID.
    let obtainedUser = mockedUsers.find(user => user.id === userId);
    return (obtainedUser) ? obtainedUser : new UserDoesNotExistError();
};

const getUsers = async (): Promise<User[] | undefined> => {
    return mockedUsers;
};

export {
    getUser,
    getUsers
}