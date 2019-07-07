import { ApiError } from '@apiErrors';

const errorCode: number = 401;

class UnathorizedWrongCredentialsError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Unauthorized - Incorrect username or password', description);
    }
};

export {
    UnathorizedWrongCredentialsError
};