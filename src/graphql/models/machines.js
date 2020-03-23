import {Schema, model } from 'mongoose';

const machineSchema = new Schema({
  machineNumber:{
    type: String,
    required: true
  },
  production:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'production'
  }]


});

export default model('machines', machineSchema);