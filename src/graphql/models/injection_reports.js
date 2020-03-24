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
  totalPiecesOK: {
    type: Number
  },
  totalPiecesNG: {
    type: Number
  },
  deadMin: {
    type: Number
  },
  eficciency: {
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

export default model('injection_reports', injectionReportSchema);