import { ApiError } from '@entities/ApiError';

const errorCode:number = 400;

class UserBadRequestError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'User wrong request.', description);
    }
};

class UserWrongPasswordError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'User wrong password.', description);
    }
};

export {
    UserBadRequestError,
    UserWrongPasswordError
};