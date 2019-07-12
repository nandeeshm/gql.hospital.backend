import { UserInterface } from '@interfaces';

class Patient implements UserInterface {
    id: string;
    socialCareNumber: string;
    idCard: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    role: number = 9;
    token: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean = true;

    birthDate: Date;
    genre: string;
    historyId: string;
}

export default Patient;