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
        // getUser: async (id: string): Promise<User | ApiError> => {
        async getUser(parentValue: any, args: any, context: any): Promise<User | ApiError> {
            logger.trace(`Getting user with id: ${args.id} ...`);
            return await services.getUser(args.id);
            // logger.trace(`Getting user with id: ${JSON.stringify(args)} ...`);
            // return await services.getUser('abcde');
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