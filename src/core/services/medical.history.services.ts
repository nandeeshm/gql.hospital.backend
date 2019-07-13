// ###############################################################
// ##########           PARSING OPERATIONS              ##########
// ###############################################################

const parseMedicalHistoryFromDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

const parseMedicalHistoryToDatabase = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject._id = parsedObject.id;
        delete parsedObject.id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

export {
    parseMedicalHistoryFromDatabase,
    parseMedicalHistoryToDatabase
};
