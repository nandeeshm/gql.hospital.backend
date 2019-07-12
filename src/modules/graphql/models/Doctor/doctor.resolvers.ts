import { ApiError }  from '@entities/ApiError';
import { Doctor }    from '@entities/Doctor';

import * as ports    from '@ports';

export default {
    Query: {
        getDoctorById: async (parentValue: any, args: any, context: any): Promise<Doctor | ApiError> => {
            return await ports.getDoctorById(args.id);
        }
    },
    Mutation: {},
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
