import logger from '@logger';

import { ApiError }  from '@entities/ApiError';
import { Doctor }    from '@entities/Doctor';

import * as ports    from '@ports';

export default {
    Query: {
        getDoctorById: async (parentValue: any, args: any, context: any): Promise<Doctor | ApiError> => {
            return await ports.getDoctorById(args.id);
        }
    },
    Mutation: {
        createNewDoctor: async (parentValue: any, args: any, context: any): Promise<Doctor | ApiError> => {
            logger.info('(gql) - Creating a new doctor ...');
            return await ports.createNewDoctor(args.data);
        }
    },
    Unions: {
        DoctorUnion: {
            __resolveType(parentValues: Doctor | ApiError) {
                if (parentValues instanceof Doctor) {
                    return 'Doctor';
                } else if (parentValues instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};
