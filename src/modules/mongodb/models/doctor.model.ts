import mongoose = require('mongoose');

import { Doctor } from '@entities/Doctor';

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    membershipNumber: { type: String, required: true },
    specialities: { type: [Schema.Types.ObjectId] },
    assignedPatients: { type: [Schema.Types.ObjectId] },
});

const DoctorModel = mongoose.model<Doctor & mongoose.Document>('Doctor', DoctorSchema);

export default DoctorModel;