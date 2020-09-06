import {Schema, model } from 'mongoose';

const cleaningSchema = new Schema({
  molde: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'moldes'
  },
  date: {
    type: String,
    required: true
    
  },
  shift: {
    type: String,
    required: true
    
  },
  team: {
    type: String,
    required: true
    
  },
  cycles: {
    type: Number,
    required: true
  },
  counted: {
    type: Number,
    required: false
  },
  comments: {
    type: String,
    required: false
  }
});

export default model('cleanings', cleaningSchema);