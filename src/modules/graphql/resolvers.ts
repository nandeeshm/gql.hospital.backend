// import loginResolver from './models/Athentication/login.resolver';
import UserResolvers from './models/User/user.resolvers';

// import DateTime      from './scalars/DateTime';

const Query = {
    ...UserResolvers.Query
};

export default {
    Query,
    // DateTime
};