import { Doctor }         from '@entities/Doctor';
import { encodePassword } from './password.services';

const initializeNewDoctor = async (newDoctorData: Doctor) => {
    let initializedDoctor: Doctor = Object.assign(new Doctor(), newDoctorData);
    
    delete initializedDoctor.id;
    
    // TODO validate that the username is a valid data, it means, this data is not a char, blank space, etc.
    if (!initializedDoctor.username) {
        initializedDoctor.username = initializedDoctor.socialCareNumber;
    }

    initializedDoctor.password = await encodePassword(initializedDoctor.name.split(' ', 1)[0].toLowerCase());
    initializedDoctor.createdAt = new Date();
    initializedDoctor.updatedAt = new Date();

    // TODO create a new empty history and assign its ID to this field, once the creation histories process is implemented.
    // initializedDoctor.historyId = createNewHistory();

    return initializedDoctor;
};

export {
    initializeNewDoctor
};
