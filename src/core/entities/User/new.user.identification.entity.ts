import User from './user.entity';

type NewUserIdentificationData = Pick<User, 'idCard' | 'socialCareNumber'>;

export default NewUserIdentificationData;