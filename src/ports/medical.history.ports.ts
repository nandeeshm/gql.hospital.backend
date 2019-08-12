import logger from '@logger';

import { 
    ApiError, 
    MedicalHistoryDoesNotExistError, 
    GettingMedicalHistoryError
} from '@entities/ApiError';

import * as adapters from '@adapters';
import { MedicalHistory } from '@entities/MedicalHistory';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getMedicalHistory = async (patientId: string): Promise<MedicalHistory | ApiError> => {
    logger.trace('(ports) - Retreaving a medical report for user with ID:', patientId);
    try {
        let persistedMedicalHistory = await adapters.getMedicalHistory('_id', patientId);

        if (persistedMedicalHistory === null) {
            logger.trace('(ports) - The patien has not any medical history assigned.');
            return new MedicalHistoryDoesNotExistError('The patien has not any medical history assigned.');
        }
        
        return persistedMedicalHistory;
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new GettingMedicalHistoryError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    getMedicalHistory
}