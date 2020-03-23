import {Schema, model } from 'mongoose';

const TechnologySchema = new Schema({
  technologyName: {
    type: String,
    required: true
  },
  paths:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'path'
  }]
});

export default model('techs', TechnologySchema);