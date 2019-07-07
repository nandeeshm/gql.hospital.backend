import * as bcrypt from 'bcryptjs';

let plainPasswords: string[] = process.argv.slice(2);

export default class Auth {
    public static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
        bcrypt.hash(password, rounds, (error, hash) => {
            callback(error, hash);
        });
    }
}

plainPasswords.map(password => {
    Auth.hashPassword(password, 1, (error, hash) => {
        if (error) {
            console.log('[ERROR] - There was an error hashing the password.', error.message);
        } else {
            console.log(`[ INFO] - ${password} == hased ==> ${hash}`);
        }
    });
});
