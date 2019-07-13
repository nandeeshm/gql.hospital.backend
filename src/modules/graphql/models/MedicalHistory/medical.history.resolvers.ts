import logger from '@logger';

import { MedicalReport } from '@entities/MedicalReport';

import * as ports         from '@ports';

export default {
    MedicalHistory: {
        medicalReports: async (parentValues: any, args: any, context: any): Promise<MedicalReport[] | null> => {
            logger.info('(gql) - Getting medical report for history with ID:', parentValues.id);
            let obtainedMedicalReports = await ports.getMedicalReports(parentValues.id);
            return (obtainedMedicalReports) ? 
                obtainedMedicalReports : 
                null;
        }
    }
};
