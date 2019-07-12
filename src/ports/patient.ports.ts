import { ApiError } from '@entities/ApiError';
import { Patient }  from '@entities/Patient';

import * as adapters from '@adapters';

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getPatientById = async (patientId: string): Promise<Patient | ApiError> => {
    return await adapters.getPatientById(patientId);
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getPatientById,
}