import logger from '@logger';

import { ApiError }       from '@entities/ApiError';
import { MedicalReport } from '@entities/MedicalReport';

import * as ports         from '@ports';

export default {
    Query: {
        testGetMedicalReportsByHistoryId: async (parentValues: any, args: any, context: any): Promise<MedicalReport[] | ApiError> => {
            logger.info('(gql) - Creating a medical reports for history with ID:', args.historyId);
            return await ports.testGetMedicalReportsByHistoryId(args.historyId);
        }
    },
    Mutation: {
        createNewMedicalReport: async (parentValues: any, args: any, context: any): Promise<MedicalReport | ApiError> => {
            logger.info('(gql) - Creating a new medical report ...');
            return await ports.createNewMedicalReport(args.data);
        }
    },
    Unions: {
        MedicalReportUnion: {
            __resolveType(parentValuess: MedicalReport | ApiError) {
                if (parentValuess instanceof MedicalReport) {
                    return 'MedicalReport';
                } else if (parentValuess instanceof ApiError) {
                    return 'ApiError';
                } else {
                    return null;
                }
            }
        }
    }
};
