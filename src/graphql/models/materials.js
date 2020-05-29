import {Schema, model } from 'mongoose';

const materialSchema = new Schema({
  number: {
    type: String,
    required: false
  },
  manufacturer: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  acronym: {
    type: String,
    required: false
  },
  identification: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  unit: {
    type: String,
    required: false
  }
});

export default model('materials', materialSchema);