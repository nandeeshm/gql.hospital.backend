import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    UserDoesNotExistError,
    UserBadRequestError
} from '@entities/ApiError';
import { Doctor } from '@entities/Doctor';

import * as dbRequests from '@dbRequests';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
    try {
        let obtainedDoctor = await dbRequests.getDoctorById(doctorId);
        return (obtainedDoctor) ? plainToClass(Doctor, obtainedDoctor) : new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getDoctorById
}