import logger        from '@logger';

import * as services from '@services/user.services';

import { ApiError }  from '@entities/ApiError';
import { User }      from '@entities/User';

// @Resolver(of => User)
// ###############################################################
// ##########                  QUERIES                  ##########
// ###############################################################

export default {
    Query: {
        getUser: async (parentValue: any, args: any, context: any): Promise<User | ApiError> => {
            logger.trace(`Getting user with id: ${args.id} ...`);
            return await services.getUser(args.id);
        }
    },
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
                // async getUsers(): Promise<User[] | undefined> {
                //     logger.trace(`Getting the whole users list ...`);
                //     return await services.getUsers();
                // }
// ###############################################################
// ##########                 MUTATIONS                 ##########
// ###############################################################