import logger                   from '@logger';
import { 
    ApiError, 
    CreatingPatientError, 
    PatientAlreadyExistsError
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
        let initializedPatient = await initializeNewPatient(patientData);
        logger.trace('(ports) - New patient initialized successfully.');

        let persistedUser = await adapters.getUser('socialCareNumber', initializedPatient.socialCareNumber);
        
        if (persistedUser === null) {
            logger.trace('(ports) - Creating a new patient\'s user ...');
            persistedUser = await adapters.createNewUser(initializedPatient);
        } else {
            logger.trace('(ports) - Patient\'s user already exists.');
        }

        let persistedPatient = await adapters.getPatient('_id', persistedUser!.id);

        if (persistedPatient === null) {
            initializedPatient.id = persistedUser!.id;
            logger.trace('(ports) - Creating a new patient ...');
            persistedPatient = await adapters.createNewPatient(initializedPatient);
        } else {
            logger.trace('(ports) - Patient already exists.');
            return new PatientAlreadyExistsError();
        }
        
        return Object.assign(persistedPatient!, persistedUser!);
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