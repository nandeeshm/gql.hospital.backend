import { MedicalReport } from '@entities/MedicalReport';

class MedicalHistory {
    id: string;
    socialCareNumber: string;
    medicalReports: MedicalReport[] = [];

    constructor (id: string, socialCareNumber: string) {
        this.id = id;
        this.socialCareNumber = socialCareNumber;  
    }
}

export default MedicalHistory;