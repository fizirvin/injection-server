import {Schema, model } from 'mongoose';

const programSchema = new Schema({
  machineNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'machines'
  },
  moldeNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'moldes'
  },
  partNumber: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'parts'
  },
  cycleTime: {
    type: Schema.Types.Decimal128,
    required: true
  },
  cycles: {
    type: Number,
    
  },
  capacity: {
    type: Number,
    required: true
  }
});

export default model('programs', programSchema);