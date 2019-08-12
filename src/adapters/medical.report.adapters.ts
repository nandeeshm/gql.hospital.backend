import logger from '@logger';
import { plainToClass } from 'class-transformer';

import * as dbRequests from '@dbRequests';
import { MedicalReport } from '@entities/MedicalReport';
import { 
    parseMedicalReportFromDatabase, 
    parseMedicalReportToDatabase 
} from '@services/medical.report.services';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewMedicalReport = async (newMedicalReport: MedicalReport): Promise<MedicalReport | null> => {
    try {
        let createdMedicalReport = await dbRequests.createNewMedicalReport(newMedicalReport);
        return (createdMedicalReport) ? 
            plainToClass(MedicalReport, parseMedicalReportFromDatabase(createdMedicalReport) as MedicalReport) : 
            null;
    } catch (error) {
        logger.error(`(createNewDoctor - adapter) - ${error.message} ${error.description}`);
        throw error;
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getMedicalReports = async (searchingParam: string, paramValue: string): Promise<MedicalReport[] | null> => {
    try {
        let obtainedMedicalReports = await dbRequests.getMedicalReports(searchingParam, paramValue);
        return (obtainedMedicalReports) ? 
            plainToClass(MedicalReport, obtainedMedicalReports.map(parseMedicalReportFromDatabase) as MedicalReport[]) : 
            null;
    } catch (error) {
        throw error;
    }
};

// const getDoctorById = async (doctorId: string): Promise<Doctor | ApiError> => {
//     try {
//         let obtainedMedicalReport = await dbRequests.getDoctorById(doctorId);
//         return (obtainedMedicalReport) ? plainToClass(Doctor, parseDoctorFromDatabase(obtainedMedicalReport)) : new DoctorDoesNotExistError();
//     } catch (error) {
//         return new DoctorBadRequestError(error.message);
//     }
// };

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewMedicalReport,
    getMedicalReports
    // getDoctorById
}