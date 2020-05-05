import {Schema, model } from 'mongoose';

const materialSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
});

export default model('materials', materialSchema);