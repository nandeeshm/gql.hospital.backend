import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class DoctorBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Doctor wrong request.', description);
    }
};

export {
    DoctorBadRequestError
};