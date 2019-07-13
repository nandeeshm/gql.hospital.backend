import { MedicalHistory } from '@entities/MedicalHistory';
import AuthenticationResolvers from './models/Athentication/authentication.resolver';
import UserResolvers           from './models/User/user.resolvers';
import DoctorResolvers         from './models/Doctor/doctor.resolvers';
import PatientResolvers        from './models/Patient/patient.resolvers';
import MedicalHistoryResolvers from './models/MedicalHistory/medical.history.resolvers';
import MedicalReportResolvers  from './models/MedicalReport/medical.report.resolvers';
import SimpleResponseResolvers from './models/SimpleResponse/simpleResponse.resolvers';

import DateTime                from './scalars/DateTime';

import Interfaces              from './interfaces/interfaces.resolvers';

const Query = {
    ...UserResolvers.Query,
    ...DoctorResolvers.Query,
    ...PatientResolvers.Query,
    ...MedicalReportResolvers.Query
};

const Mutation = {
    ...AuthenticationResolvers.Mutation,
    ...DoctorResolvers.Mutation,
    ...PatientResolvers.Mutation,
    ...MedicalReportResolvers.Mutation
};

const Unions = {
    ...AuthenticationResolvers.Unions,
    ...UserResolvers.Unions,
    ...DoctorResolvers.Unions,
    ...PatientResolvers.Unions,
    ...SimpleResponseResolvers.Unions,
    ...MedicalReportResolvers.Unions
};

const Scalars = {
    DateTime
};

export default {
    Query,
    Mutation,
    ...Unions,
    ...Interfaces,
    ...Scalars,
    Patient: PatientResolvers.Patient,
    MedicalHistory: MedicalHistoryResolvers.MedicalHistory
};