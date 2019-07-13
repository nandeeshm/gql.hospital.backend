import mongoose = require('mongoose');

import { MedicalReport } from '@entities/MedicalReport';

var Schema = mongoose.Schema;

var MedicalReportSchema = new Schema({
    bindToReport: { type: Schema.Types.ObjectId, required: true },
    // TODO Refact the 'department' field once there is an entity with departments, in order to use IDs.
    department: { type: String, required: true },
    // TODO Refact the 'reportType' field once there is an entity with report types, in order to use IDs.
    reportType: { type: String, required: true },
    reportDate: { type: Date, required: true },
    signedBy: { type: Schema.Types.ObjectId, required: true },
    verification: {
        required: { type: Boolean, default: false },
        requiredTo: { type: Schema.Types.ObjectId },
        verifiedBy: { type: Schema.Types.ObjectId },
        verifiedAt: { type: Date },
        notes: { type: String },
    },
    content: { type: String, required: true },
    attachedTests: { type: [Schema.Types.ObjectId] }
});

const MedicalReportModel = mongoose.model<MedicalReport & mongoose.Document>('MedicalReport', MedicalReportSchema);

export {
    MedicalReportSchema,
    MedicalReportModel
};