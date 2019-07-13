import logger from '@logger';
import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    DoctorBadRequestError,
    DoctorDoesNotExistError
} from '@entities/ApiError';
import { Doctor } from '@entities/Doctor';

import * as dbRequests from '@dbRequests';
import { parseDoctorFromDatabase } from '@services/doctor.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewDoctor = async (DoctorData: Doctor): Promise<Doctor | ApiError> => {
    try {
        let createdDoctor = await dbRequests.createNewDoctor(DoctorData);
        return (createdDoctor) ? plainToClass(Doctor, parseDoctorFromDatabase(createdDoctor)) : new DoctorDoesNotExistError();
    } catch (error) {
        logger.error(`(createNewDoctor - adapter) - ${error.message} ${error.description}`);
        return new DoctorBadRequestError(error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
    try {
        let obtainedDoctor = await dbRequests.getDoctorById(doctorId);
        return (obtainedDoctor) ? plainToClass(Doctor, parseDoctorFromDatabase(obtainedDoctor)) : new DoctorDoesNotExistError();
    } catch (error) {
        return new DoctorBadRequestError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewDoctor,
    getDoctorById
}