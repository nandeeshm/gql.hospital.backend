import mongoose = require('mongoose');

// import { MedicalReport } from '@entities/MedicalReport';

var Schema = mongoose.Schema;

var MedicalReportSchema = new Schema({
    bindToReport: { type: Schema.Types.ObjectId },
    department: { type: Schema.Types.ObjectId },
    reportType: { type: Schema.Types.ObjectId },
    reportDate: { type: Date, required: true },
    signedBy: { type: Date, required: true },
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

// const MedicalReportModel = mongoose.model<MedicalReport & mongoose.Document>('MedicalReport', MedicalReportSchema);

// export default MedicalReportModel;

export default MedicalReportSchema;