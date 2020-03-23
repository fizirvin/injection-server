import {Schema, model } from 'mongoose';

const shiftReportSchema = new Schema({
  eficciency: {
    type: Float,
    required: true
  },
  shifhtReports:[{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'shiftReport'
  }]
});

export default model('shiftReports', shiftReportSchema);