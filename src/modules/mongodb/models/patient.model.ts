import mongoose = require('mongoose');

import { Patient } from '@entities/Patient';

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    socialCareNumber: { type: String },
    idCard: { type: String },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, ref: 'Role', required: true },
    token: { type: String },
    lastLoginAt: { type: Number },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    enabled: { type: Boolean, required: true },
    birthDate: { type: Number, required: true },
    genre: { type: String, required: true },
    // TODO set the historyId field as required, once the creating histories process is implemented.
    historyId: { type: Schema.Types.ObjectId }
});

const PatientModel = mongoose.model<Patient & mongoose.Document>('Patient', PatientSchema);

export default PatientModel;