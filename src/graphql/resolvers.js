import machines from './models/machines.js'
import moldes from './models/moldes.js'

export const resolvers = {
    Query: {
        async machines(){
            return await machines.find();
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
      }
    }
}