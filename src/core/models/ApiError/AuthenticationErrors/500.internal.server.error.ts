import { ApiError } from '@apiErrors';

const errorCode: number = 500;

class AuthenticationError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Authentication Error', description);
    }
};

export {
    AuthenticationError
};