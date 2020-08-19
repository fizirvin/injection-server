import {Schema, model } from 'mongoose';

const injectionReportSchema = new Schema({
  reportDate: {
    type: Date
  },
  shift: {
    type: String
  },
  createdAt: {
    type: Date,
    required: false
  },
  updatedAt: {
    type: Date,
    required: false
  },
  machine: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'machines'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  TReal: {
    type: Number
  },
  TNG: {
    type: Number
  },
  TOK: {
    type: Number
  },
  TPlan: {
    type: Number
  },
  TProd: {
    type: Number
  },
  TWTime: {
    type: Schema.Types.Decimal128
  },
  TDTime: {
    type: Schema.Types.Decimal128
  },
  TAvailability: {
    type: Schema.Types.Decimal128
  },
  TPerformance: {
    type: Schema.Types.Decimal128
  },
  TQuality: {
    type: Schema.Types.Decimal128
  },
  TOEE: {
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
    plan: {
      type: Number
    },
    prod: {
      type: Number
    },
    wtime: {
      type: Schema.Types.Decimal128
    },
    dtime: {
      type: Schema.Types.Decimal128
    },
    availability: {
      type: Schema.Types.Decimal128
    },
    performance: {
      type: Schema.Types.Decimal128
    },
    quality: {
      type: Schema.Types.Decimal128
    },
    oee: {
      type: Schema.Types.Decimal128
    },
    cycles: {
      type: Number,
      required: false,
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
  }],
  comments: {
    type: String,
    required: false
  },
  workers: {
    team: { 
      type: String,
      required: false,
    },
    operator: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    inspector: { 
      type: Schema.Types.ObjectId,
      required: false,
    }
  }
});

export default model('reports', injectionReportSchema);