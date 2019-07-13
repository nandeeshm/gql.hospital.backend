import { ApiError } from '@entities/ApiError';

const errorCode: number = 500;

class CreatingMedicalHistoryError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Creating medical history Error', description);
    }
};

class GettingMedicalHistoryError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Getting medical history Error', description);
    }
};

export {
    CreatingMedicalHistoryError,
    GettingMedicalHistoryError
};