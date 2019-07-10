import AuthenticationResolvers from './models/Athentication/authentication.resolver';
import UserResolvers           from './models/User/user.resolvers';
import SimpleResponseResolvers from './models/SimpleResponse/simpleResponse.resolvers';

import DateTime                from './scalars/DateTime';

const Query = {
    ...UserResolvers.Query
};

const Mutation = {
    ...AuthenticationResolvers.Mutation,
};

const Unions = {
    ...AuthenticationResolvers.Unions,
    ...UserResolvers.Unions,
    ...SimpleResponseResolvers.Unions
};

const Scalars = {
    DateTime
};

export default {
    Query,
    Mutation,
    ...Unions,
    ...Scalars
};