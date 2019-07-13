import mongoose = require('mongoose');

import { MedicalHistory } from '@entities/MedicalHistory';
import { MedicalReportSchema } from './medical.report.model';

var Schema = mongoose.Schema;

var MedicalHistorySchema = new Schema({
    socialCareNumber: { type: String, required: true },
    medicalReports: { type: [MedicalReportSchema] },
});

const MedicalHistoryModel = mongoose.model<MedicalHistory & mongoose.Document>('MedicalHistory', MedicalHistorySchema);

export default MedicalHistoryModel;