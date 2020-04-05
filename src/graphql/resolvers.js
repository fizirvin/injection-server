import machines from './models/machines.js'
import moldes from './models/moldes.js'
import parts from './models/parts.js'
import issues from './models/issues.js'
import programs from './models/programs.js'
import reports from './models/reports.js'


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
          async issues(){
            return await issues.find();
          },
          async programs(){
            return await programs.find().populate({path: 'machineNumber', model: 'machines'})
            .populate({path: 'moldeNumber', model: 'moldes'})
            .populate({path: 'partNumber', model: 'parts'});
          },
          async reports(){
            return await reports.find()
            .populate({path: 'machine', model: 'machines'})
          }
    },
    Mutation: {
      async newMachine(_, { input }){
        const newMachine = new machines(input);
        await newMachine.save();   
        return newMachine;
      },
      async updateMachine(_,{ _id, input }){
        return await machines.findByIdAndUpdate(_id,input, {new: true });
      },
      async newMolde(_, { input }){
        const newMolde = new moldes(input);
        await newMolde.save();   
        return newMolde;
      },
      async updateMolde(_,{ _id, input }){
        return await moldes.findByIdAndUpdate(_id,input, {new: true });
      },
      async newPartNumber(_, { input }){
        const newPartNumber = new parts(input);
        await newPartNumber.save();   
        return newPartNumber;
      },
      async updatePartNumber(_,{ _id, input }){
        return await parts.findByIdAndUpdate(_id,input, {new: true });
      },
      async newIssue(_, { input }){
        const newIssue = new issues(input);
        await newIssue.save();   
        return newIssue;
      },
      async updateIssue(_,{ _id, input }){
        return await issues.findByIdAndUpdate(_id,input, {new: true });
      },
      async newProgram(_, { input }){
        const newProgram = new programs(input);
       
        return await newProgram.save().
        then((newProgram) => programs.findOne({ _id: newProgram._id })
          .populate({path: 'machineNumber', model: 'machines'})
          .populate({path: 'moldeNumber', model: 'moldes'})
          .populate({path: 'partNumber', model: 'parts'})
        );
      },
      async updateProgram(_,{ _id, input }){
        return await programs.findByIdAndUpdate(_id,input, {new: true })
        .populate({path: 'machineNumber', model: 'machines'})
        .populate({path: 'moldeNumber', model: 'moldes'})
        .populate({path: 'partNumber', model: 'parts'});
      },
      async newInjectionReport(_, { input }){
        const newReport = new reports(input);
        await newReport.save().populate({path: 'machine', model: 'machines'})
        return newReport;
      },
    }
}