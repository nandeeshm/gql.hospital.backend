import * as validate from '../../../core/validators';

const parseRequestParametersIntoMongoDBQuery = (requestParameters, entityFields) => {
    try {
        validate.common.generalObjectEmptyAllowed(requestParameters, 'The request parameters must be defined in order to parse them into a valid query.');
        validate.common.stringArray(entityFields, 'A collection of entity\'s fields must be provided in order to parse the request.');

        let query;

        query = _checkAllParameter(requestParameters);
        if (null !== query) { return query; }

        query = _checkFilterByParameter(requestParameters, entityFields);
        
        return query;
    } catch (error) {
        throw error;
    }
};

const _checkAllParameter = (requestParameters) => {
    return (true === requestParameters.all) ? {} : null;
};

const _checkFilterByParameter = (requestParameters, entityFields) => {
    const { filterBy } = requestParameters;

    validate.common.generalObject(filterBy, 'The \'filterBy\' object must be defined in order to operate with it.');
    validate.common.stringArray(entityFields, 'A collection of entity\'s fields must be provided in order to parse the request.');
    
    return Object.keys(filterBy).reduce((previousValue, filterKey) => {
        let parsedKey = (new RegExp(/^id$/).test(filterKey)) ? '_id' : filterKey;
        
        if (null !== filterBy[filterKey] && undefined !== filterBy[filterKey] && entityFields.includes(parsedKey)) {
            if (Array === filterBy[filterKey].constructor && filterBy[filterKey].length > 0) {
                previousValue[parsedKey] = { '$in': filterBy[filterKey] };
            } else if (Array !== filterBy[filterKey].constructor) {
                previousValue[parsedKey] = filterBy[filterKey];
            }
        }
            
        return previousValue;
    }, {});
};

const test = {
    checkAllParameter: _checkAllParameter,
    checkFilterByParameter: _checkFilterByParameter
};

export {
    parseRequestParametersIntoMongoDBQuery,
    test
};