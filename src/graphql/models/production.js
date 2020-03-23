import {Schema, model } from 'mongoose';

const productionSchema = new Schema({
  productionDate: {
    type: String,
    required: true
  },
  shifhtReports:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'shiftReport'
  }]
});

export default model('production', productionSchema);