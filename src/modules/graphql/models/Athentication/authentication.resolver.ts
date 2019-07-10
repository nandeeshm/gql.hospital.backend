import { ApiError }          from '@entities/ApiError';
import { SimpleResponse }    from '@entities/SimpleResponse';
import { AuthenticatedUser } from '@entities/Athentication';

import * as ports            from '@ports';

export default {
    Mutation: {
        login: async (parentValue: any, args: any, context: any): Promise<AuthenticatedUser | ApiError> => {
            return await ports.login(args.data);
        },
        logout: async (parentValue: any, args: any, context: any): Promise<SimpleResponse | ApiError> => {
            return await ports.logout(context.token);
        }
    },
    Unions: {
        AuthenticatedUserUnion: {
            __resolveType(parentValues: AuthenticatedUser | ApiError) {
                if (parentValues instanceof AuthenticatedUser) {
                    return 'AuthenticatedUser';
                } else if (parentValues instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};