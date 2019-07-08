import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var TranslateSchema = new Schema({
    locale: { type: String, required: true },
    translation: { type: String, required: true },
    isDefault: { type: Boolean, required: true, default: false }
});

export default TranslateSchema;