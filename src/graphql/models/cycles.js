import {Schema, model } from 'mongoose';

const cycleSchema = new Schema({
  machine: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'machines'
  },
  program: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'programs'
  },
  molde: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'moldes'
  },
  report: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'reports'
  },
  part: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'parts'
  },
  cycles: {
    type: Number,
    required: true
    
  },
  pcs: {
    type: Number,
    required: true
  }
});

export default model('Cycle', cycleSchema);