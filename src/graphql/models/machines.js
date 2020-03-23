import {Schema, model } from 'mongoose';

const machinechema = new Schema({
  machineNumber:{
    type: String,
    required: true
  },
  courses:[{
    courseId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    urlImage: {
      type: String
    },
    urlRepository: {
      type: String
    },
    urlCourse: {
      type: String
    },
    urlCertification: {
      type: String
    },
    urlInstructor: {
      type: String
    },
    platform: {
      type: String
    }
  }]


});

export default model('machines', machineSchema);