import logger from '@logger';

import { MedicalReport } from '@entities/MedicalReport';

// ###############################################################
// ##########           GENERAL OPERATIONS              ##########
// ###############################################################

const initializeNewMedicalReport = async (newMedicalReportData: MedicalReport) => {
    try {
        let initializedMedicalReport: MedicalReport = Object.assign(new MedicalReport(), newMedicalReportData);

        initializedMedicalReport.reportDate = new Date();

        return initializedMedicalReport;
    } catch (error) {
        logger.error('(service) MedicalReport init error.', error.message);
        throw error;
    }
};

// ###############################################################
// ##########           PARSING OPERATIONS              ##########
// ###############################################################

const parseMedicalReportFromDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

const parseMedicalReportToDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject._id = parsedObject.id;
        delete parsedObject.id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

export {
    initializeNewMedicalReport,
    parseMedicalReportFromDatabase,
    parseMedicalReportToDatabase
};
