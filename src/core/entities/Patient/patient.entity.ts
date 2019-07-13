import { User } from '@entities/User';

class Patient extends User {
    deceased: boolean = false;
    historyId: string;
}

export default Patient;