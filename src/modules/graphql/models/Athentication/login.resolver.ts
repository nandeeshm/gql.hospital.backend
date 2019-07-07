import logger from '@logger';

import * as services from '@services/authentication.services';

import { 
    Resolver, 
    Mutation, 
    Arg 
} from 'type-graphql';
import loginInputType from './login.input.type';
import {
    AuthenticatedUser,
    AuthenticatedUserUnion
} from './authenticated.user.type';

@Resolver(of => loginInputType)
class UserResolver {

    // ###############################################################
    // ##########                  QUERIES                  ##########
    // ###############################################################

    // ###############################################################
    // ##########                 RESOLVERS                 ##########
    // ###############################################################
    
    @Mutation(returns => AuthenticatedUserUnion)
    async login(@Arg('data') data: loginInputType): Promise<typeof AuthenticatedUserUnion> {
        logger.trace(`loging user ${data.username} ...`);
        return await services.login(data.username, data.password);
    }
}

export default UserResolver;