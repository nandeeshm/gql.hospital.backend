import { ApiError } from '@entities/ApiError';

const errorCode: number = 500;

class CreatingMedicalReportError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Creating medical report Error', description);
    }
};

class GettingMedicalReportError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Getting medical report Error', description);
    }
};

export {
    CreatingMedicalReportError,
    GettingMedicalReportError
};