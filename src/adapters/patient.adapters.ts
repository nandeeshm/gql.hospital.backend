import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    UserDoesNotExistError,
    UserBadRequestError
} from '@entities/ApiError';
import { Patient } from '@entities/Patient';

import * as dbRequests from '@dbRequests';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getPatientById = async (patientId: string): Promise<Patient | ApiError> => {
    try {
        let obtainedPatient = await dbRequests.getPatientById(patientId);
        return (obtainedPatient) ? plainToClass(Patient, obtainedPatient) : new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getPatientById
}