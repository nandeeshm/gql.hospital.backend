import { ApiError } from '@entities/ApiError';

const errorCode:number = 404;

class DoctorDoesNotExistError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'The selected doctor doesn\'t exist.', description);
    }
};

export {
    DoctorDoesNotExistError
};