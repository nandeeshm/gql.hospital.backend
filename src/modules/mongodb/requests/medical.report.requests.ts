import logger from "@logger";

import { models } from '@mongodb';
import { MedicalReport } from '@entities/MedicalReport';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewMedicalReport = async (newMedicalReportData: MedicalReport) => {
    logger.trace('(ddbb) - Persisting a new MedicalReport ...');
    try {
        let persistedMedicalReport = await models
            .MedicalReportModel
            .create(newMedicalReportData);
        logger.info('(ddbb) - New medical Report successfully persisted with ID:', persistedMedicalReport._id);
        return persistedMedicalReport;
    } catch (error) {
        logger.error(`(ddbb - createNewMedicalReport) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMedicalReports = async (searchingParam: string, paramValue: string) => {
    logger.trace(`(ddbb) Getting medical Report by '${searchingParam}': ${paramValue}`);
    try {
        let criteria = JSON.parse(`{ "${searchingParam}": "${paramValue}" }`);
        let projection = { 'locale': 0 };
        return await models.MedicalReportModel.find(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getMedicalReportById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// const getMedicalReportById = async (MedicalReportId: string) => {
//     logger.trace('(ddbb) Getting MedicalReport by ID:', MedicalReportId);
//     try {
//         let criteria = { _id: fieldIdConverter['userId'](MedicalReportId) };
//         let projection = { 'locale': 0 };
//         return await models.MedicalReportModel.findOne(criteria, projection).lean().exec();
//     } catch (error) {
//         logger.error(`(getMedicalReportById) - ${error.message} ${error.description}`);
//         throw new Error((error.description) ? error.description : error.message);
//     }
// };

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewMedicalReport,
    getMedicalReports,
    // getMedicalReportById
};