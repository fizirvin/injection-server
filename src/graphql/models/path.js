import {Schema, model } from 'mongoose';

const pathSchema = new Schema({
  pathName:{
    type: String,
    required: true
  },
  coreTechnology: {
    type: String,
    required: true
  },
  urlPath: {
    type: String
  },
  urlPathCertification: {
    type: String
  },
  urlImage: {
    type: String
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

export default model('path', pathSchema);