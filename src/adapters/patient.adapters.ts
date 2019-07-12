import logger from '@logger';
import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    PatientDoesNotExistError,
    PatientBadRequestError
} from '@entities/ApiError';
import { Patient } from '@entities/Patient';

import * as dbRequests from '@dbRequests';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewPatient = async (patientData: Patient): Promise<Patient | ApiError> => {
    try {
        let createdPatient = await dbRequests.createNewPatient(patientData);
        return (createdPatient) ? plainToClass(Patient, createdPatient) : new PatientDoesNotExistError();
    } catch (error) {
        logger.error(`(createNewPatient - adapter) - ${error.message} ${error.description}`);
        return new PatientBadRequestError(error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getPatientById = async (patientId: string): Promise<Patient | ApiError> => {
    try {
        let obtainedPatient = await dbRequests.getPatientById(patientId);
        return (obtainedPatient) ? plainToClass(Patient, obtainedPatient) : new PatientDoesNotExistError();
    } catch (error) {
        return new PatientBadRequestError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewPatient,
    getPatientById
}