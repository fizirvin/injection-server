import {Schema, model } from 'mongoose';

const injectionReportSchema = new Schema({
  reportDate: {
    type: Date
  },
  shift: {
    type: String
  },
  leader: {
    type: String
  },
  machine: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'machines'
  },
  operatorMachine: {
    type: String
  },
  qualityInspector: {
    type: String
  },
  totalOK: {
    type: Number
  },
  totalNG: {
    type: Number
  },
  downtime: {
    type: Number
  },
  efficiency: {
    type: Number
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
    ok: {
      type: Number
    },
    ng: {
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