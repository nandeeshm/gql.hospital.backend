import { User } from '@entities/User';

class Doctor extends User {
    userId: string;
    memershipNumber: string;
    specialities: string[];
    assignedPatients: string[];
}

export default Doctor;