import { mongodb }  from '../index';

const fieldIdConverter = {
    userId: (userId: string) => _convert('userId', userId),
    // usersIds: (usersIds) => _convertMultiple('usersIds', usersIds),
    // hotelId: (hotelId) => _convert('hotelId', hotelId),
    // hotelsIds: (hotelsIds) => _convertMultiple('hotelsIds', hotelsIds),
    // hotelsChainId: (hotelsChainId) => _convert('hotelsChainId', hotelsChainId),
    // hotelsChainIds: (hotelsChainIds) => _convertMultiple('hotelsChainIds', hotelsChainIds),
    // hotelsGroupId: (hotelsGroupId) => _convert('hotelsGroupId', hotelsGroupId),
    // loggedInDeviceIds: (loggedInDeviceIds) => _convertMultiple('loggedInDeviceIds', loggedInDeviceIds),
};

const _convert = (fieldName: string, valueToBeConverted: string) => {
    try {
        // validate.common.mongodbId(valueToBeConverted);

        return mongodb.Types.ObjectId(valueToBeConverted);
    } catch (error) {
        throw new Error(`(fieldIdConverter) - The field '${fieldName}' (${valueToBeConverted}) is wrong: ${(error.description) ? error.description : error.message}`);
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

// const parseIdFieldForSingleObject = (rawObjectData) => {
//     if (!rawObjectData || Object.keys(rawObjectData).length === 0) {
//         throw new ApiError.ArgumentNotValid('(parseIdFieldForSingleObject) - The provided object cannot be empty, null or undefined.');
//     }
//     if (!rawObjectData._id) {
//         throw new ApiError.ArgumentNotValid('(parseIdFieldForSingleObject) - The provided object doesn\'t contain an \'_id\' field to be parsed.');
//     }

//     let parsedObject = JSON.parse(JSON.stringify(rawObjectData));
//     parsedObject.id = parsedObject._id;
//     delete parsedObject._id;

//     return parsedObject;
// };

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
    // parseIdFieldForSingleObject,
    // parseIdFieldForArrayOfObjects,
    test
};