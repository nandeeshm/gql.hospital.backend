import logger from '@logger';

import { 
    ApiError, 
    CreatingDoctorError, 
    DoctorAlreadyExistsError,
    DoctorDoesNotExistError,
    GettingDoctorError
} from '@entities/ApiError';
import { User } from '@entities/User';
import { Doctor } from '@entities/Doctor';

import * as adapters from '@adapters';
import { initializeNewDoctor } from '@services/doctor.services';
import { checkIfUserExists } from '@services/user.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewDoctor = async (doctorData: Doctor): Promise<Doctor | ApiError> => {
    logger.trace('(ports) - Creating a new Doctor ...');
    try {
        let initializedDoctor = await initializeNewDoctor(doctorData);
        logger.trace('(ports) - New doctor initialized successfully.');
        
        let persistedUser = await adapters.getUser('socialCareNumber', initializedDoctor.socialCareNumber);
        
        if (persistedUser === null) {
            logger.trace('(ports) - Creating a new doctor\'s user ...');
            persistedUser = await adapters.createNewUser(initializedDoctor);
        } else {
            logger.trace('(ports) - Doctor\'s user already exists.');
        }

        let persistedDoctor = await adapters.getDoctor('_id', persistedUser!.id);

        if (persistedDoctor === null) {
            initializedDoctor.id = persistedUser!.id;
            logger.trace('(ports) - Creating a new doctor ...');
            persistedDoctor = await adapters.createNewDoctor(initializedDoctor);
        } else {
            logger.trace('(ports) - Doctor already exists.');
            return new DoctorAlreadyExistsError();
        }
        
        return Object.assign(persistedDoctor!, persistedUser!);
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new CreatingDoctorError(error.message);
    }
};

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
    logger.trace('(ports) - Retreaving a Doctor by ID:', doctorId);
    try {
        let persistedUser = await adapters.getUser('_id', doctorId);
        
        if (persistedUser === null) {
            logger.trace('(ports) - The doctor\'s user doesn\'t exist.');
            return new DoctorDoesNotExistError('The doctor\'s user doesn\'t exist.');
        }

        let persistedDoctor = await adapters.getDoctor('_id', doctorId);

        if (persistedDoctor === null) {
            logger.trace('(ports) - The doctor doesn\'t exist.');
            return new DoctorDoesNotExistError();
        }
        
        return Object.assign(persistedDoctor!, persistedUser!);
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new GettingDoctorError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewDoctor,
    getDoctorById,
}