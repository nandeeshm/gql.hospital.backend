import AuthenticationResolvers from './models/Athentication/authentication.resolver';
import UserResolvers           from './models/User/user.resolvers';
import DoctorResolvers         from './models/Doctor/doctor.resolvers';
import SimpleResponseResolvers from './models/SimpleResponse/simpleResponse.resolvers';

import DateTime                from './scalars/DateTime';

import Interfaces              from './interfaces/interfaces.resolvers';

const Query = {
    ...UserResolvers.Query,
    ...DoctorResolvers.Query
};

const Mutation = {
    ...AuthenticationResolvers.Mutation,
};

const Unions = {
    ...AuthenticationResolvers.Unions,
    ...UserResolvers.Unions,
    ...DoctorResolvers.Unions,
    ...SimpleResponseResolvers.Unions
};

const Scalars = {
    DateTime
};

export default {
    Query,
    Mutation,
    ...Unions,
    ...Interfaces,
    ...Scalars
};