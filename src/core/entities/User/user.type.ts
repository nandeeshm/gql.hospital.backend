class User {
    id: string;
    name: string;
    surname: string;
    username: string;
    private _password: string;
    role: number;
    token: string;
    // lastLoginAt: Date;
    // createdAt: Date;
    // updatedAt: Date;
    enabled: boolean = true;

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }
}

export default User;