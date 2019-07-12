import { ApiError } from '@entities/ApiError';
import { Doctor }   from '@entities/Doctor';

import * as adapters from '@adapters';

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
}