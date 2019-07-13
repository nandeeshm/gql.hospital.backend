import logger from '@logger';

import { Patient } from '@entities/Patient';
import { encodePassword } from './password.services';

// ###############################################################
// ##########           GENERAL OPERATIONS              ##########
// ###############################################################

const initializeNewPatient = async (newPatientData: Patient) => {
    try {
        let initializedPatient: Patient = Object.assign(new Patient(), newPatientData);
        
        delete initializedPatient.id;

        // TODO validate that the username is a valid data, it means, this data is not a char, blank space, etc.
        if (!initializedPatient.username) {
            initializedPatient.username = initializedPatient.socialCareNumber;
        }
        
        initializedPatient.password = await encodePassword(initializedPatient.name.split(' ', 1)[0].toLowerCase());
        initializedPatient.role = 0;
        initializedPatient.createdAt = new Date();
        initializedPatient.updatedAt = new Date();

        // TODO create a new empty history and assign its ID to this field, once the creation histories process is implemented.
        // initializedPatient.historyId = createNewHistory();

        return initializedPatient;
    } catch (error) {
        logger.error('(service) Patient init error.', error.message);
        throw error;
    }
};

// ###############################################################
// ##########           PARSING OPERATIONS              ##########
// ###############################################################

const parsePatientFromDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

const parsePatientToDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject._id = parsedObject.id;
        delete parsedObject.id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

export {
    initializeNewPatient,
    parsePatientFromDatabase,
    parsePatientToDatabase
};
