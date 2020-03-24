import {Schema, model } from 'mongoose';

const partSchema = new Schema({
  partNumber: {
    type: String,
    required: true
  }
});

export default model('parts', partSchema);