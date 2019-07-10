import { ApiError }  from '@entities/ApiError';
import { User }      from '@entities/User';

import * as ports    from '@ports';

export default {
    Query: {
        getUser: async (parentValue: any, args: any, context: any): Promise<User | ApiError> => {
            return await ports.getUser(args.id);
        }
    },
    Mutation: {},
    Unions: {
        UserUnion: {
            __resolveType(parentValues: User | ApiError) {
                if (parentValues instanceof User) {
                    return 'User';
                } else if (parentValues instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};
