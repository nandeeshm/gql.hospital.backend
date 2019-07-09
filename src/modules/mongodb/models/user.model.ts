import mongoose = require('mongoose');

import { User } from '@entities/User';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, ref: 'Role', required: true },
    token: { type: String },
    lastLoginAt: { type: Number },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    enabled: { type: Boolean, required: true }
});

const UserModel = mongoose.model<User & mongoose.Document>('User', UserSchema);

export default UserModel;