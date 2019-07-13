import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class PatientAlreadyExistsError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Patient already exists.', description);
    }
};
class PatientBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Patient wrong request.', description);
    }
};

export {
    PatientAlreadyExistsError,
    PatientBadRequestError
};