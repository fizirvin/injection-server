import {Schema, model } from 'mongoose';

const machineSchema = new Schema({
  machineNumber:{
    type: String,
    required: true
  },
  machineSerial:{
    type: String,
    required: true
  },
  closingForce:{
    type: Number,
    required: true
  },
  spindleDiameter:{
    type: Number,
    required: true
  },
  reports:[{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'injection_reports'
  }]


});

export default model('machines', machineSchema);