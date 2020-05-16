import {Schema, model } from 'mongoose';

const partSchema = new Schema({
  partNumber: {
    type: String,
    required: false
  },
  partName: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: false
  }
});

export default model('parts', partSchema);