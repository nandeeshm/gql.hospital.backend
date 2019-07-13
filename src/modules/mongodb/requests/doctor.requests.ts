import logger from "@logger";

import { 
    fieldIdConverter
} from '../common/fieldIdConverter';
import { models } from '@mongodb';
import { Doctor } from '@entities/Doctor';

// ###############################################################
// ##########           CREATING OPERATIONS             ##########
// ###############################################################

const createNewDoctor = async (newDoctorData: Doctor) => {
    logger.trace('(ddbb) - Persisting a new doctor ...');
    try {
        let persistedDoctor = await models
            .DoctorModel
            .create(newDoctorData);
        logger.info('(ddbb) - New doctor successfully persisted with ID:', persistedDoctor._id);
        return persistedDoctor;
    } catch (error) {
        logger.error(`(ddbb - createNewDoctor) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getDoctorById = async (doctorId: string) => {
    logger.trace('Getting doctor by ID:', doctorId);
    try {
        let criteria = { _id: fieldIdConverter['userId'](doctorId) };
        let projection = { 'locale': 0 };
        return await models.DoctorModel.findOne(criteria, projection).lean().exec();
    } catch (error) {
        logger.error(`(getDoctorById) - ${error.message} ${error.description}`);
        throw new Error((error.description) ? error.description : error.message);
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

export {
    createNewDoctor,
    getDoctorById
};