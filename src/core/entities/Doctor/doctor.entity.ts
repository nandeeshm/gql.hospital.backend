import { UserInterface } from '@interfaces';

class Doctor implements UserInterface {
    id: string;
    socialCareNumber: string;
    idCard: string;
    name: string;
    surname: string;
    username: string;
    password: string;
    role: number = 29;
    token: string;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean = true;

    memershipNumber: string;
    speciality: string[];
    assignedPatients: string[];
}

export default Doctor;