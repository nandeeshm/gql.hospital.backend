import { ApiError } from '@entities/ApiError';
import { Doctor }   from '@entities/Doctor';

import * as adapters from '@adapters';

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getDoctorById = async (userId: string): Promise<Doctor | ApiError> => {
    return await adapters.getDoctorById(userId);
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getDoctorById,
}