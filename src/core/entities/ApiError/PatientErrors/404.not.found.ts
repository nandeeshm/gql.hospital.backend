import { ApiError } from '@entities/ApiError';

const errorCode:number = 404;

class PatientDoesNotExistError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'The selected patient doesn\'t exist.', description);
    }
};

export {
    PatientDoesNotExistError
};