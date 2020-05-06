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
    type: Schema.Types.Decimal128
  },
  downtime: {
    type: Number
  },
  efficiency: {
    type: Schema.Types.Decimal128
  },
  production: [{
    program: {
      type: Schema.Types.ObjectId,
      ref: 'programs'
    },
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
      type: Schema.Types.Decimal128
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
  }],
  defects: [{
    defect: {
      type: Schema.Types.ObjectId,
      ref: 'defects'
    },
    defectPcs: {
      type: Number
    },
    molde: {
      type: Schema.Types.ObjectId,
      ref: 'moldes'
    },
    partNumber: {
      type: Schema.Types.ObjectId,
      ref: 'parts'
    },
    program: {
      type: Schema.Types.ObjectId,
      ref: 'programs'
    }
  }],
  resines: [{
    resine: {
      type: Schema.Types.ObjectId,
      ref: 'materials'
    },
    purge: {
      type: Number
    }, 
  }]
});

export default model('reports', injectionReportSchema);