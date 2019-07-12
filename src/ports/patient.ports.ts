import logger                   from '@logger';
import { 
    ApiError, 
    CreatingPatientError 
} from '@entities/ApiError';
import { Patient }              from '@entities/Patient';

import * as adapters            from '@adapters';
import { initializeNewPatient } from '@services/patient.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewPatient = async (patientData: Patient): Promise<Patient | ApiError> => {
    logger.trace('(ports) - Creating a new patient ...');
    try {
        // TODO Check if already exists a patiend with the same social care number and id card.
        let initializedPatient = await initializeNewPatient(patientData);
        logger.trace('(ports) - New patient initialized successfully.');
        return await adapters.createNewPatient(initializedPatient);
    } catch (error) {
        logger.error(`(createNewPatient - port) - ${error.message} ${error.description}`);
        return new CreatingPatientError(error.message);
    }
};

// ###############################################################
// ##########           READING OPERATIONS              ##########
// ###############################################################

const getPatientById = async (patientId: string): Promise<Patient | ApiError> => {
    return await adapters.getPatientById(patientId);
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewPatient,
    getPatientById,
}