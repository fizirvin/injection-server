import {Schema, model } from 'mongoose';

const issueSchema = new Schema({
  issueName: {
    type: String,
    required: true
  },
  issueCode: {
    type: String,
    required: true
  }
});

export default model('issues', issueSchema);