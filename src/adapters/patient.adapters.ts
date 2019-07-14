import logger from '@logger';
import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    PatientDoesNotExistError,
    PatientBadRequestError
} from '@entities/ApiError';
import { Patient } from '@entities/Patient';

import * as dbRequests from '@dbRequests';
import { parsePatientFromDatabase, parsePatientToDatabase } from '@services/patient.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewPatient = async (patientData: Patient): Promise<Patient | null> => {
    try {
        let createdPatient = await dbRequests.createNewPatient(parsePatientToDatabase(patientData));
        return (createdPatient) ? 
            plainToClass(Patient, parsePatientFromDatabase(createdPatient)) : 
            null;
    } catch (error) {
        logger.error(`(createNewPatient - adapter) - ${error.message} ${error.description}`);
        throw error;
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getPatient = async (searchingParam: string, paramValue: string): Promise<Patient | null> => {
    try {
        let obtainedPatient = await dbRequests.getPatient(searchingParam, paramValue);
        return (obtainedPatient) ? 
            plainToClass(Patient, parsePatientFromDatabase(obtainedPatient)) : 
            null;
    } catch (error) {
        throw error;
    }
};

const getPatientById = async (patientId: string): Promise<Patient | ApiError> => {
    try {
        let obtainedPatient = await dbRequests.getPatientById(patientId);
        return (obtainedPatient) ? plainToClass(Patient, parsePatientFromDatabase(obtainedPatient)) : new PatientDoesNotExistError();
    } catch (error) {
        return new PatientBadRequestError(error.message);
    }
};

const getAllPatients = async (): Promise<Patient[] | null> => {
    try {
        let obtainedPatients = await dbRequests.getAllPatients();
        return (obtainedPatients) ? 
            obtainedPatients.map((patient: any) => plainToClass(Patient, parsePatientFromDatabase(patient))) : 
            null;
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewPatient,
    getPatient,
    getPatientById,
    getAllPatients
}