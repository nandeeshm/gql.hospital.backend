import mongoose = require('mongoose');

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

var User = mongoose.model('User', UserSchema);

export default User;