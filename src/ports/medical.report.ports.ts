import logger from '@logger';

import { 
    ApiError, 
    CreatingMedicalReportError,
    GettingMedicalReportError
} from '@entities/ApiError';

import * as adapters from '@adapters';
import { MedicalReport } from '@entities/MedicalReport';
import { initializeNewMedicalReport } from '@services/medical.report.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewMedicalReport = async (medicalReportData: MedicalReport): Promise<MedicalReport | ApiError> => {
    logger.trace('(ports) - Creating a new medical report ...');
    try {
        // TODO Check if the bound medical history really exists.

        let initializedDoctor = await initializeNewMedicalReport(medicalReportData);
        logger.trace('(ports) - New medical report initialized successfully.');

        let createdReport = await adapters.createNewMedicalReport(initializedDoctor);

        return (createdReport) ?
            createdReport :
            new CreatingMedicalReportError();
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new CreatingMedicalReportError(error.message);
    }
};

// ###############################################################
// ##########           GETTING OPERATIONS              ##########
// ###############################################################

const getMedicalReports = async (medicalHistoryId: string): Promise<MedicalReport[] | null> => {
    logger.trace('(ports) - Retreaving medical reports for history ID:', medicalHistoryId);
    try {
        let persistedMedicalReports = await adapters.getMedicalReports('bindToReport', medicalHistoryId);

        if (persistedMedicalReports === null) {
            logger.trace('(ports) - The patient\'s history has not any medical report.');
        }
        
        return persistedMedicalReports;
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return null;
    }
};

const testGetMedicalReportsByHistoryId = async (medicalHistoryId: string): Promise<MedicalReport[] | ApiError> => {
    logger.trace('(ports) - Retreaving medical reports for history ID:', medicalHistoryId);
    try {
        let persistedMedicalReports = await adapters.getMedicalReports('bindToReport', medicalHistoryId);
        
        if (persistedMedicalReports !== null) {
            return persistedMedicalReports;
        } else {
            logger.trace('(ports) - The patient\'s history has not any medical report.');
            return new GettingMedicalReportError('There was no reports.');
        }
    } catch (error) {
        logger.error(`(createNewDoctor - port) - ${error.message} ${error.description}`);
        return new GettingMedicalReportError(error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewMedicalReport,
    getMedicalReports,
    testGetMedicalReportsByHistoryId
}