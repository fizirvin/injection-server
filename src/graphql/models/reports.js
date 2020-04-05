import {Schema, model } from 'mongoose';

const injectionReportSchema = new Schema({
  reportDate: {
    type: Date
  },
  shift: {
    type: String
  },
  machine: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'machines'
  },
  totalReal: {
    type: Number
  },
  totalOK: {
    type: Number
  },
  totalNG: {
    type: Number
  },
  totalTime: {
    type: Number
  },
  downtime: {
    type: Number
  },
  efficiency: {
    type: Schema.Types.Number
  },
  production: [{
    partNumber: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'parts'
    },
    molde:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'moldes'
    },
    real: {
      type: Number
    },
    ng: {
      type: Number
    },
    ok: {
      type: Number
    },
    time: {
      type: Number
    },
    oee: {
      type: Number
    },
    capacity: {
      type: Number
    }
  }],
  deadTime: [{
    issueId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'issues'
    },
    deadTime: {
      type: Number
    }
  }]
});

export default model('reports', injectionReportSchema);