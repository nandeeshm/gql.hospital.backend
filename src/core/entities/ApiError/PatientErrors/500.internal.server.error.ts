import { ApiError } from '@entities/ApiError';

const errorCode: number = 500;

class CreatingPatientError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Creating Patient Error', description);
    }
};

export {
    CreatingPatientError
};