import {Schema, model } from 'mongoose';

const moldeSchema = new Schema({
  moldeNumber: {
    type: String,
    required: true
  },
  moldeSerial: {
    type: String,
    required: true
  }
});

export default model('moldes', moldeSchema);