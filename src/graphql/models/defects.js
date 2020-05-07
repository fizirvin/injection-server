import {Schema, model } from 'mongoose';

const defectSchema = new Schema({
  defectName: {
    type: String,
    required: true
  },
  defectCode: {
    type: String,
    required: true
  },
  isInjection: {
    type: Boolean,
    required: true
  }
});

export default model('defects', defectSchema);