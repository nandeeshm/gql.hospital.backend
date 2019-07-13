import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class DoctorAlreadyExistsError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Doctor already exists.', description);
    }
};
class DoctorBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Doctor wrong request.', description);
    }
};

export {
    DoctorAlreadyExistsError,
    DoctorBadRequestError
};