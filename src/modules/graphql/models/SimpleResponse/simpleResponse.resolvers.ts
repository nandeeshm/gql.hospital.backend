import { ApiError }       from '@entities/ApiError';
import { SimpleResponse } from '@entities/SimpleResponse';

export default {
    Unions: {
        SimpleResponseUnion: {
            __resolveType(parentValues: SimpleResponse | ApiError) {
                if (parentValues instanceof SimpleResponse) {
                    return 'SimpleResponse';
                } else if (parentValues instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};