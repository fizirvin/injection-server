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
  quantity: {
    type: Number,
    required: false
  },
  end: {
    type: String,
    required: false
    
  },
  shiftEnd: {
    type: String,
    required: false
    
  },
  active: {
    type: Boolean,
    required: true
    
  },
  comments: {
    type: String,
    required: false
  }
});

export default model('cleanings', cleaningSchema);