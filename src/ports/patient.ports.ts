import logger                   from '@logger';
import { 
    ApiError, 
    CreatingPatientError, 
    PatientAlreadyExistsError,
    PatientDoesNotExistError,
    GettingPatientError
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
            // TODO Create a new history and assign its id to this patient.
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
    logger.trace('(ports) - Retreaving a patient by ID:', patientId);
    try {
        let persistedUser = await adapters.getUser('_id', patientId);
        
        if (persistedUser === null) {
            logger.trace('(ports) - The patient\'s user doesn\'t exist.');
            return new PatientDoesNotExistError('The patient\'s user doesn\'t exist.');
        }

        let persistedPatient = await adapters.getPatient('_id', patientId);

        if (persistedPatient === null) {
            logger.trace('(ports) - The patient doesn\'t exist.');
            return new PatientDoesNotExistError();
        }
        
        return Object.assign(persistedPatient!, persistedUser!);
    } catch (error) {
        logger.error(`(createNewPatient - port) - ${error.message} ${error.description}`);
        return new GettingPatientError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewPatient,
    getPatientById,
}