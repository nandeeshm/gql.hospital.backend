import { Patient } from '@entities/Patient';
import { encodePassword } from './password.services';

const initializeNewPatient = async (newPatientData: Patient) => {
    let initializedPatient: Patient = Object.assign(new Patient(), newPatientData);
    
    delete initializedPatient.id;
    
    initializedPatient.password = await encodePassword(initializedPatient.name.split(' ', 1)[0].toLowerCase());
    initializedPatient.createdAt = new Date();
    initializedPatient.updatedAt = new Date();

    // TODO create a new empty history and assign its ID to this field, once the creation histories process is implemented.
    // initializedPatient.historyId = createNewHistory();

    return initializedPatient;
};

export {
    initializeNewPatient
};
