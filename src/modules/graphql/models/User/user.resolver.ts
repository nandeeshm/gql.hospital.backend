import logger                    from '@logger';

import * as services             from '@services/user.services';

import { Resolver, Query, Arg }  from 'type-graphql';
import { User, UserSearchUnion } from './user.type';

// @Resolver(of => User)
@Resolver()
class UserResolver {

    // ###############################################################
    // ##########                  QUERIES                  ##########
    // ###############################################################

    @Query(returns => UserSearchUnion)
    async getUser(@Arg('id') id: string): Promise<typeof UserSearchUnion> {
        logger.trace(`Getting user with id: ${id} ...`);
        return await services.getUser(id);
    }

    @Query(returns => [User], { nullable: true })
    async getUsers(): Promise<User[] | undefined> {
        logger.trace(`Getting the whole users list ...`);
        return await services.getUsers();
    }

    // ###############################################################
    // ##########                 RESOLVERS                 ##########
    // ###############################################################

}

export default UserResolver;