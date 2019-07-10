import { User } from "@entities/User";

class AuthenticatedUser {
    name: string;
    surname: string;
    username: string;
    role: number;
    token: string;

    constructor (userData?: User) {
        this.name = (userData) ? userData.name : '';
        this.surname = (userData) ? userData.surname : '';
        this.username = (userData) ? userData.username : '';
        this.role = (userData) ? userData.role : 0;
        this.token = (userData) ? userData.token : '';
    }
}

export default AuthenticatedUser;