import logger from "@logger";

import { 
    fieldIdConverter, 
    parseIdFieldForSingleObject 
} from '../common/fieldIdConverter';
import { models } from '@mongodb';

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
    getPatientById
};