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
  totalCapacity: {
    type: Number
  },
  totalTime: {
    type: Number
  },
  downtime: {
    type: Number
  },
  efficiency: {
    type: Schema.Types.Decimal128
  },
  production: [{
    partNumber: {
      type: Schema.Types.ObjectId,
      ref: 'parts'
    },
    molde:{
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.Decimal128
    },
    capacity: {
      type: Number
    }
  }],
  downtimeDetail: [{
    issueId: {
      type: Schema.Types.ObjectId,
      ref: 'issues'
    },
    mins: {
      type: Number
    }
  }]
});

export default model('reports', injectionReportSchema);