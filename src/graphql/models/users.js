import {Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

export default model('User', userSchema);