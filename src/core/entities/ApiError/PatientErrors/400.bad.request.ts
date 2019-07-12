import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class PatientBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Patient wrong request.', description);
    }
};

export {
    PatientBadRequestError
};