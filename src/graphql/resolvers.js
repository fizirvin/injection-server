import path from './models/path.js';
import techs from './models/technology.js';

export const resolvers = {
    Query: {
        async paths(){
            return await path.find();
          },
          async techs(){
            return await techs.find().populate({path: 'paths', model: 'path'});
          }
    }
}