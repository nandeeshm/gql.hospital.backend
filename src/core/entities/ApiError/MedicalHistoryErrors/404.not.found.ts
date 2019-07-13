import { ApiError } from '@entities/ApiError';

const errorCode:number = 404;

class MedicalHistoryDoesNotExistError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'The selected medical history doesn\'t exist.', description);
    }
};

export {
    MedicalHistoryDoesNotExistError
};