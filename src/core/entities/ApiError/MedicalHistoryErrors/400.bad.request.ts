import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class MedicalHistoryAlreadyExistsError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Medical history already exists.', description);
    }
};
class MedicalHistoryBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Medical history wrong request.', description);
    }
};

export {
    MedicalHistoryAlreadyExistsError,
    MedicalHistoryBadRequestError
};