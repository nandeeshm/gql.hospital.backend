import logger from '@logger';
import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    DoctorBadRequestError,
    DoctorDoesNotExistError
} from '@entities/ApiError';
import { Doctor } from '@entities/Doctor';

import * as dbRequests from '@dbRequests';
import { 
    parseDoctorFromDatabase, 
    parseDoctorToDatabase 
} from '@services/doctor.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewDoctor = async (DoctorData: Doctor): Promise<Doctor | null> => {
    try {
        let createdDoctor = await dbRequests.createNewDoctor(parseDoctorToDatabase(DoctorData));
        return (createdDoctor) ? 
            plainToClass(Doctor, parseDoctorFromDatabase(createdDoctor)) : 
            null;
    } catch (error) {
        logger.error(`(createNewDoctor - adapter) - ${error.message} ${error.description}`);
        throw error;
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDoctor = async (searchingParam: string, paramValue: string): Promise<Doctor | null> => {
    try {
        let obtainedDoctor = await dbRequests.getDoctor(searchingParam, paramValue);
        return (obtainedDoctor) ? 
            plainToClass(Doctor, parseDoctorFromDatabase(obtainedDoctor)) : 
            null;
    } catch (error) {
        throw error;
    }
};

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
    getDoctor,
    getDoctorById
}