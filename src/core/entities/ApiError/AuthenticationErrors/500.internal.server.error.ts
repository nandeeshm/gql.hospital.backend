import { ApiError } from '@entities/ApiError';

const errorCode: number = 500;

class AuthenticationError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Authentication Error', description);
    }
};

class LogoutError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Logout Error', description);
    }
};

export {
    AuthenticationError,
    LogoutError
};