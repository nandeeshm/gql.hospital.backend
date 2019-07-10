import { ApiError } from '@entities/ApiError';

const errorCode:number = 503;

class TokenEncodingError extends ApiError {
    constructor(description?: string) {
        super(errorCode, 'Token encoding error.', description);
    }
};

export {
    TokenEncodingError
};