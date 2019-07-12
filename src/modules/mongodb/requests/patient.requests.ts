import { Patient } from '@entities/Patient';
import logger from "@logger";

import { 
    fieldIdConverter, 
    parseIdFieldForSingleObject 
} from '../common/fieldIdConverter';
import { models } from '@mongodb';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewPatient = async (newPatientData: Patient) => {
    logger.trace('(ddbb) - Persisting a new patient ...');
    try {
        let persistedPatient = await models
            .PatientModel
            .create(newPatientData);
        logger.info('(ddbb) - New patient successfully persisted with ID:', persistedPatient._id);
        return parseIdFieldForSingleObject(persistedPatient);
    } catch (error) {
        logger.error(`(ddbb - createNewPatient) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getPatientById = async (patientId: string) => {
    logger.trace('Getting patient by ID:', patientId);
    try {
        // validate.users.patientId(patientId, 'The user\'s ID must be defined in order to get the user data.');
        let criteria = { _id: fieldIdConverter['userId'](patientId) };
        let projection = { 'locale': 0 };
        let result = await models.PatientModel.findOne(criteria, projection).lean().exec();
        return parseIdFieldForSingleObject(result);
    } catch (error) {
        logger.error(`(getDoctorById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewPatient,
    getPatientById
};