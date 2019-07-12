import mongoose = require('mongoose');

import { Doctor } from '@entities/Doctor';

var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
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
    membershipNumber: { type: String, required: true },
    speciality: { type: Schema.Types.ObjectId },
    boundPatients: { type: [Schema.Types.ObjectId] },
});

const DoctorModel = mongoose.model<Doctor & mongoose.Document>('Doctor', DoctorSchema);

export default DoctorModel;