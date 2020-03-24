import machines from './models/machines.js'
import moldes from './models/moldes.js'
import parts from './models/parts.js'
import issues from './models/issues.js'

export const resolvers = {
    Query: {
        async machines(){
            return await machines.find();
          },
          async moldes(){
            return await moldes.find();
          },
          async parts(){
            return await parts.find();
          },
          async machines(){
            return await issues.find();
          }
    },
    Mutation: {
      async newMachine(_, { input }){
        const newMachine = new machines(input);
        await newMachine.save();   
        return newMachine;
      },
      async newMolde(_, { input }){
        const newMolde = new moldes(input);
        await newMolde.save();   
        return newMolde;
      },
      async newPartNumber(_, { input }){
        const newPartNumber = new parts(input);
        await newPartNumber.save();   
        return newPartNumber;
      },
      async newIssue(_, { input }){
        const newIssue = new issues(input);
        await newIssue.save();   
        return newIssue;
      }
    }
}