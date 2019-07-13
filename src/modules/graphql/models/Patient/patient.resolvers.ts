import logger from '@logger';

import { ApiError }       from '@entities/ApiError';
import { Patient }        from '@entities/Patient';
import { MedicalHistory } from '@entities/MedicalHistory';

import * as ports         from '@ports';

export default {
    Patient: {
        medicalHistory: async (parentValues: any, args: any, context: any): Promise<MedicalHistory | null> => {
            logger.info('(gql) - Getting medical history for user with ID:', parentValues.id);
            let obtainedMedicalHistory = await ports.getMedicalHistory(parentValues.id);
            return (obtainedMedicalHistory instanceof MedicalHistory) ? 
                obtainedMedicalHistory : 
                null;
        }
    },
    Query: {
        getPatientById: async (parentValues: any, args: any, context: any): Promise<Patient | ApiError> => {
            return await ports.getPatientById(args.id);
        }
    },
    Mutation: {
        createNewPatient: async (parentValues: any, args: any, context: any): Promise<Patient | ApiError> => {
            logger.info('(gql) - Creating a new patient ...');
            return await ports.createNewPatient(args.data);
        }
    },
    Unions: {
        PatientUnion: {
            __resolveType(parentValuess: Patient | ApiError) {
                if (parentValuess instanceof Patient) {
                    return 'Patient';
                } else if (parentValuess instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};
