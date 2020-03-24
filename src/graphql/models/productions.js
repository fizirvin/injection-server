import {Schema, model } from 'mongoose';

const productionSchema = new Schema({
  productionDate: {
    type: String,
    required: true
  },
  injection:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'injection_reports'
  }]
});

export default model('productions', productionSchema);