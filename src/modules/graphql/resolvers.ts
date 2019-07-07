import loginResolver from './models/Athentication/login.resolver';
import UserResolver from './models/User/user.resolver';

const resolvers = [
    loginResolver,
    UserResolver
];

export default resolvers;