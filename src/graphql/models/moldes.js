import {Schema, model } from 'mongoose';

const moldeSchema = new Schema({
  moldeSerial: {
    type: String,
    required: true
  },
  moldeNumber: {
    type: String,
    required: true
  }
});

export default model('moldes', moldeSchema);