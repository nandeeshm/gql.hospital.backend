import logger from '@logger';

import { 
    ApiError, 
    CreatingDoctorError 
} from '@entities/ApiError';
import { Doctor } from '@entities/Doctor';

import * as adapters from '@adapters';
import { initializeNewDoctor } from '@services/doctor.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewDoctor = async (DoctorData: Doctor): Promise<Doctor | ApiError> => {
    logger.trace('(ports) - Creating a new Doctor ...');
    try {
        // TODO Check if already exists a doctor with the same social care number and id card.
        let initializedDoctor = await initializeNewDoctor(DoctorData);
        logger.trace('(ports) - New doctor initialized successfully.');
        return await adapters.createNewDoctor(initializedDoctor);
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new CreatingDoctorError(error.message);
    }
};

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
    return await adapters.getDoctorById(doctorId);
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getDoctorById,
    createNewDoctor,
}