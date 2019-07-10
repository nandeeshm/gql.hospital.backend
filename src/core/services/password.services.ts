import * as bcrypt from 'bcryptjs';

const encodePassword = async (plainPassword: string): Promise<string> => {
    return await bcrypt.hash(plainPassword, process.env.BCRYPT_SALT_ROUNDS || 1);
};

const comparePassword = async (plainPassword: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hash);
};

export {
    encodePassword,
    comparePassword
};