import machines from './models/machines.js'
import moldes from './models/moldes.js'
import parts from './models/parts.js'
import issues from './models/issues.js'
import defects from './models/defects.js'
import programs from './models/programs.js'
import reports from './models/reports.js'


function formatDate(format){
  let formatDate
  const date = new Date(format);
  const y = date.getFullYear()
  const d = date.getDate();
  const m = date.getMonth()+1

  function M(){
    if(m < 10){
      return '0'+ m
    } else { return m } 
  }
  
  function D(){
    if(d < 10){
      return '0'+ d
    } else { return d }
  }

  const formatD = D();
  const formatM = M();
  formatDate = y + '-'+ formatM + '-'+ formatD
  return formatDate
}


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
    async defects(){
      return await defects.find();
    },
    async programs(){
      return await programs.find().populate({path: 'machineNumber', model: 'machines'})
      .populate({path: 'moldeNumber', model: 'moldes'})
      .populate({path: 'partNumber', model: 'parts'});
    },
    async reports(){
      return await reports.find()
      .populate({path: 'machine', model: 'machines'})
      .populate({path: 'program', model: 'programs'})
      .populate({path: 'production.partNumber', model: 'parts'})
      .populate({path: 'production.molde', model: 'moldes'})
      .populate({path: 'downtimeDetail.issueId', model: 'issues'})
      .sort({ reportDate: -1 });
      
    },
    async reportsByDate(parent, args){
      return await reports.find({ reportDate: { $gte: args.initial, $lte: args.end } })
      .populate({path: 'downtimeDetail.issueId', model: 'issues'})
      .sort({ reportDate: -1 }).then( report => {
        const array = [...report]
        const convert = array.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine
          const downtime = item.downtimeDetail.map( downtime =>{
            return { 
              report: id, 
              date: date, 
              machine: machine, 
              issue: downtime.issueId._id, 
              issueName: downtime.issueId.issueName, 
              mins: downtime.mins}
          })
          return downtime
        })
        let flatDownTime = [].concat.apply([],convert);
        
        return flatDownTime })
    },
    async reportsDate(parent, args){
      return await reports.find({ reportDate: { $gte: args.initial, $lte: args.end } })
      .sort({ reportDate: 1 }).then( report => {
        const array = [...report]
        const convert = array.map( item => { 
          const date = formatDate(item.reportDate);
          const id = item._id
          const machine = item.machine
          const production = item.production.map( prod =>{
            return { report: id, date: date, machine: machine, part: prod.partNumber, molde: prod.molde, ok: prod.ok, ng: prod.ng}
          })
          return production
        })
        let flat = [].concat.apply([],convert);
        
        return flat })
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
    async newDefect(_, { input }){
      const newDefect = new defects(input);
        await newDefect.save();   
        return newDefect;
    },
    async updateDefect(_,{ _id, input }){
      return await defects.findByIdAndUpdate(_id,input, {new: true });
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
      const already = await reports.find(
        { machine: newReport.machine, 
          reportDate: newReport.reportDate, 
          shift: newReport.shift
        }
      )
      if(!already.length == 0) { 
        const error = new Error('already reported')
        throw error
      }
      
      return await newReport.save().
      then((newReport) => 
        reports.findOne({_id: newReport._id})
        .populate({path: 'machine', model: 'machines'})
        .populate({path: 'program', model: 'programs'})
        .populate({path: 'production.partNumber', model: 'parts'})
        .populate({path: 'production.molde', model: 'moldes'})
        .populate({path: 'downtimeDetail.issueId', model: 'issues'})
      );  
    },
    async updateInjectionReport(_,{ _id, input }){
      return await reports.findByIdAndUpdate(_id,input, {new: true })
        .populate({path: 'machine', model: 'machines'})
        .populate({path: 'program', model: 'programs'})
        .populate({path: 'production.partNumber', model: 'parts'})
        .populate({path: 'production.molde', model: 'moldes'})
        .populate({path: 'downtimeDetail.issueId', model: 'issues'});
    }
  }
}