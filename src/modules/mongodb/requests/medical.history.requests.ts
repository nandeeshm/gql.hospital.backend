import logger from "@logger";

import { models } from '@mongodb';
import { MedicalHistory } from '@entities/MedicalHistory';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewMedicalHistory = async (newMedicalHistoryData: MedicalHistory) => {
    logger.trace('(ddbb) - Persisting a new MedicalHistory ...');
    try {
        let persistedMedicalHistory = await models
            .MedicalHistoryModel
            .create(newMedicalHistoryData);
        logger.info('(ddbb) - New medical history successfully persisted with ID:', persistedMedicalHistory._id);
        return persistedMedicalHistory;
    } catch (error) {
        logger.error(`(ddbb - createNewMedicalHistory) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMedicalHistory = async (searchingParam: string, paramValue: string) => {
    logger.trace(`(ddbb) Getting medical history by '${searchingParam}': ${paramValue}`);
    try {
        let criteria = JSON.parse(`{ "${searchingParam}": "${paramValue}" }`);
        let projection = { 'locale': 0 };
        return await models.MedicalHistoryModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getMedicalHistoryById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// const getMedicalHistoryById = async (MedicalHistoryId: string) => {
//     logger.trace('(ddbb) Getting MedicalHistory by ID:', MedicalHistoryId);
//     try {
//         let criteria = { _id: fieldIdConverter['userId'](MedicalHistoryId) };
//         let projection = { 'locale': 0 };
//         return await models.MedicalHistoryModel.findOne(criteria, projection).lean().exec();
//     } catch (error) {
//         logger.error(`(getMedicalHistoryById) - ${error.message} ${error.description}`);
//         throw new Error((error.description) ? error.description : error.message);
//     }
// };

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewMedicalHistory,
    getMedicalHistory,
    // getMedicalHistoryById
};