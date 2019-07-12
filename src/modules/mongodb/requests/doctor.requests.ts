import logger from "@logger";

import { 
    fieldIdConverter, 
    parseIdFieldForSingleObject 
} from '../common/fieldIdConverter';
import { models } from '@mongodb';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDoctorById = async (doctorId: string) => {
    logger.trace('Getting doctor by ID:', doctorId);
    try {
        // validate.users.doctorId(doctorId, 'The user\'s ID must be defined in order to get the user data.');
        let criteria = { _id: fieldIdConverter['userId'](doctorId) };
        let projection = { 'locale': 0 };
        let result = await models.DoctorModel.findOne(criteria, projection).lean().exec();
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
    getDoctorById
};