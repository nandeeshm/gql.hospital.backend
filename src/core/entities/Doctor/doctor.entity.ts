import { User } from '@entities/User';

class Doctor extends User {
    memershipNumber: string;
    specialities: string[];
    assignedPatients: string[];
}

export default Doctor;