import {Schema, model } from 'mongoose';

const defectSchema = new Schema({
  defectName: {
    type: String,
    required: true
  },
  defectCode: {
    type: String,
    required: true
  }
});

export default model('defects', defectSchema);