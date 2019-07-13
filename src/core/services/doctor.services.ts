import logger from '@logger';

import { Doctor } from '@entities/Doctor';
import { encodePassword } from './password.services';

// ###############################################################
// ##########           GENERAL OPERATIONS              ##########
// ###############################################################

const initializeNewDoctor = async (newDoctorData: Doctor) => {
    try {
        let initializedDoctor: Doctor = Object.assign(new Doctor(), newDoctorData);
        
        delete initializedDoctor.id;
        
        // TODO validate that the username is a valid data, it means, this data is not a char, blank space, etc.
        if (!initializedDoctor.username) {
            initializedDoctor.username = initializedDoctor.socialCareNumber;
        }

        initializedDoctor.password = await encodePassword(initializedDoctor.name.split(' ', 1)[0].toLowerCase());
        initializedDoctor.role = 20;
        initializedDoctor.createdAt = new Date();
        initializedDoctor.updatedAt = new Date();

        // TODO create a new empty history and assign its ID to this field, once the creation histories process is implemented.
        // initializedDoctor.historyId = createNewHistory();

        return initializedDoctor;
    } catch (error) {
        logger.error('(service) Doctor init error.', error.message);
        throw error;
    }
};

// ###############################################################
// ##########           PARSING OPERATIONS              ##########
// ###############################################################

const parseDoctorFromDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

const parseDoctorToDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject._id = parsedObject.id;
        delete parsedObject.id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

export {
    initializeNewDoctor,
    parseDoctorFromDatabase,
    parseDoctorToDatabase
};
