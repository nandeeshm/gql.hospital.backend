import logger from '@logger';

import { ApiError }       from '@entities/ApiError';
import { Patient }        from '@entities/Patient';

import * as ports         from '@ports';

export default {
    Query: {
        getPatientById: async (parentValue: any, args: any, context: any): Promise<Patient | ApiError> => {
            return await ports.getPatientById(args.id);
        }
    },
    Mutation: {
        createNewPatient: async (parentValue: any, args: any, context: any): Promise<Patient | ApiError> => {
            logger.info('(gql) - Creating a new patient ...');
            return await ports.createNewPatient(args.data);
        }
    },
    Unions: {
        PatientUnion: {
            __resolveType(parentValues: Patient | ApiError) {
                if (parentValues instanceof Patient) {
                    return 'Patient';
                } else if (parentValues instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};
