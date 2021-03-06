import {Schema, model } from 'mongoose';

const moldeSchema = new Schema({
  moldeNumber: {
    type: String,
    required: true
  },
  moldeSerial: {
    type: String,
    required: true
  },
  cavities: {
    type: Number,
    required: false
  },
  lifecycles: {
    type: Number,
    required: false
  },
  tcycles: {
    type: Number,
    required: false
  },
  shot: {
    type: Number,
    required: false
  },
  quantity: {
    type: Number,
    required: false
  },
  active: {
    type: Boolean,
    required: false
  }
});

export default model('moldes', moldeSchema);