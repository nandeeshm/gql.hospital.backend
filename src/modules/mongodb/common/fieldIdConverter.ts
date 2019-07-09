import { mongodb }  from '../index';

const fieldIdConverter = {
    userId: (userId: string) => _convert('userId', userId),
    // usersIds: (usersIds) => _convertMultiple('usersIds', usersIds),
};

const _convert = (fieldName: string, valueToBeConverted: string) => {
    try {
        // validate.common.mongodbId(valueToBeConverted);

        return mongodb.Types.ObjectId(valueToBeConverted);
    } catch (error) {
        throw new Error(`The field '${fieldName}' (${valueToBeConverted}) is wrong: ${(error.description) ? error.description : error.message}`);
    }
};
// const _convertMultiple = (fieldName, setToBeConverted) => {
//     try {
//         validate.common.mongodbIdArray(setToBeConverted);
        
//         return setToBeConverted.map((valueToBeConverted) => _convert(fieldName, valueToBeConverted));
//     } catch (error) {
//         throw new ApiError.ArgumentNotValid(`(fieldIdConverter) - The field '${fieldName}' (${setToBeConverted}) is wrong: ${(error.description) ? error.description : error.message}`);
//     }
// };

const parseIdFieldForSingleObject = (rawObjectData: any) => {
    if (rawObjectData && Object.keys(rawObjectData).length > 0) {
        let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
        parsedObject.id = parsedObject._id;
        delete parsedObject._id;
    
        return parsedObject;
    }
    
    return rawObjectData;
};

// const parseIdFieldForArrayOfObjects = (setOfRawObjects) => {
//     try {
//         if (!setOfRawObjects || Array !== setOfRawObjects.constructor) {
//             throw new ApiError.ArgumentNotValid('(parseIdFieldForArrayOfObjects) - The provided set of objects cannot be empty, null or undefined.');
//         } else if (setOfRawObjects.length === 0) {
//             return setOfRawObjects;
//         }

//         return setOfRawObjects.reduce((previosValue, rawObjectData) => {
//             let parsedObject = parseIdFieldForSingleObject(rawObjectData);
        
//             return [...previosValue, parsedObject];
//         }, []);
//     } catch (error) {
//         throw error;
//     }
// };

// ###############################################################
// ##########                  TEST                     ##########
// ###############################################################

const test = {
    convert: _convert,
    // convertMultiple: _convertMultiple
};

export {
    fieldIdConverter,
    parseIdFieldForSingleObject,
    // parseIdFieldForArrayOfObjects,
    test
};