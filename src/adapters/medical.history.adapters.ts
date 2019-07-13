import logger from '@logger';
import { plainToClass } from 'class-transformer';

import * as dbRequests from '@dbRequests';
import { MedicalHistory } from '@entities/MedicalHistory';
import { 
    parseMedicalHistoryFromDatabase, 
    parseMedicalHistoryToDatabase 
} from '@services/medical.history.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewMedicalHistory = async (newMedicalHistory: MedicalHistory): Promise<MedicalHistory | null> => {
    try {
        let createdMedicalHistory = await dbRequests.createNewMedicalHistory(parseMedicalHistoryToDatabase(newMedicalHistory));
        return (createdMedicalHistory) ? 
            plainToClass(MedicalHistory, parseMedicalHistoryFromDatabase(createdMedicalHistory) as MedicalHistory) : 
            null;
    } catch (error) {
        logger.error(`(createNewDoctor - adapter) - ${error.message} ${error.description}`);
        throw error;
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMedicalHistory = async (searchingParam: string, paramValue: string): Promise<MedicalHistory | null> => {
    try {
        let obtainedMedicalHistory = await dbRequests.getMedicalHistory(searchingParam, paramValue);
        return (obtainedMedicalHistory) ? 
            plainToClass(MedicalHistory, parseMedicalHistoryFromDatabase(obtainedMedicalHistory) as MedicalHistory) : 
            null;
    } catch (error) {
        throw error;
    }
};

// const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
//     try {
//         let obtainedMedicalHistory = await dbRequests.getDoctorById(doctorId);
//         return (obtainedMedicalHistory) ? plainToClass(Doctor, parseDoctorFromDatabase(obtainedMedicalHistory)) : new DoctorDoesNotExistError();
//     } catch (error) {
//         return new DoctorBadRequestError(error.message);
//     }
// };

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewMedicalHistory,
    getMedicalHistory
    // getDoctorById
}