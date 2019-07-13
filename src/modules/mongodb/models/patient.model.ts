import mongoose = require('mongoose');

import { Patient } from '@entities/Patient';

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    socialCareNumber: { type: String, required: true },
    deceased: { type: Boolean, required: true },
    // TODO set the historyId field as required, once the creating histories process is implemented.
    historyId: { type: Schema.Types.ObjectId }
});

const PatientModel = mongoose.model<Patient & mongoose.Document>('Patient', PatientSchema);

export default PatientModel;