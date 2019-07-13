import { UserInterface } from '@interfaces';

class User implements UserInterface {
    id: string;
    socialCareNumber: string;
    idCard: string;
    name: string;
    surname: string;
    birthDate: Date;
    genre: string;
    username: string;
    password: string;
    role: number;
    token: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean = true;
}

export default User;