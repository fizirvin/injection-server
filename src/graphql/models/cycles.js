import {Schema, model } from 'mongoose';

const cycleSchema = new Schema({
  machine: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'machines'
  },
  program: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'programs'
  },
  molde: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'moldes'
  },
  report: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'reports'
  },
  part: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'parts'
  },
  cycles: {
    type: Number,
    required: false
    
  },
  pcs: {
    type: Number,
    required: false
  }
});

export default model('Cycle', cycleSchema);