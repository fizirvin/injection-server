import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";


const typeDefs = `
    scalar Decimal
    scalar Date

    type Query {
        machines: [Machine] 
        moldes: [Molde]
        parts: [PartNumber]
        issues: [Issue]
        programs: [Program]
        reports: [InjectionReport]
        reportsDate(initial: Date, end: Date): [InjectionReport]
    }

    type Machine {
        _id: ID!
        machineNumber: String!
        machineSerial: String!
        reports: [InjectionReport]
    }

    type Production {
        _id: ID!
        productionDate: Date!
        injection: [InjectionReport]
    }

    type InjectionReport {
        _id: ID!
        reportDate: Date
        shift: String
        machine: Machine
        totalReal: Int
        totalOK: Int
        totalNG: Int
        totalCapacity: Int
        totalTime: Int
        downtime: Int
        efficiency: Decimal
        production: [InjectionProduction]
        downtimeDetail: [DowntimeDetail]
    }

    type InjectionProduction {
        _id: ID!
        partNumber: PartNumber
        molde: Molde
        real: Int
        ng: Int
        ok: Int
        time: Int
        oee: Decimal
        capacity: Int
    }

    type DowntimeDetail {
        _id: ID!
        issueId: Issue
        mins: Int
    }

    type PartNumber {
        _id: ID!
        partNumber: String!
    }

    type Molde {
        _id: ID!
        moldeNumber: String!
        moldeSerial: String!
    }

    type Issue {
        _id: ID!
        issueName: String!
    }

    type Program {
        _id: ID!
        machineNumber: Machine!
        moldeNumber: Molde!
        partNumber: PartNumber!
        cycles: Int!
        capacity: Int!
    }


    type Mutation {
        newInjectionReport(_id: ID, input: NewInjectionReport): InjectionReport
        updateInjectionReport(_id: ID, input: NewInjectionReport): InjectionReport
        
        newMachine(_id: ID, input: NewMachine): Machine
        updateMachine(_id: ID, input: NewMachine): Machine

        newMolde(_id: ID, input: NewMolde): Molde
        updateMolde(_id: ID, input: NewMolde): Molde

        newPartNumber(_id: ID, input: NewPartNumber): PartNumber
        updatePartNumber(_id: ID, input: NewPartNumber): PartNumber

        newIssue(_id: ID, input: NewIssue): Issue
        updateIssue(_id: ID, input: NewIssue): Issue

        newProgram(_id: ID, input: NewProgram): Program
        updateProgram(_id: ID, input: NewProgram): Program

        
    }

    input NewMachine {
        machineNumber: String!
        machineSerial: String!
    }

    input NewMolde {
        moldeNumber: String!
        moldeSerial: String!
    }

    input NewPartNumber {
        partNumber: String!
    }

    input NewIssue {
        issueName: String!
    }

    input NewProgram {
        machineNumber: ID
        moldeNumber: ID
        partNumber: ID
        cycles: Int!
        capacity: Int!
    }

    input NewInjectionReport {
        
        reportDate: Date
        shift: String
        machine: ID
        totalReal: Int
        totalOK: Int
        totalNG: Int
        totalCapacity: Int
        totalTime: Int
        downtime: Int
        efficiency: Decimal
        production: [InjectionProductionInput]
        downtimeDetail: [DowntimeDetailInput]
        
    }

    input InjectionProductionInput {
        partNumber: ID
        molde: ID
        real: Int
        ng: Int
        ok: Int
        time: Int
        oee: Decimal
        capacity: Int
    }

    input DowntimeDetailInput{
        issueId: ID
        mins: Int
    }

`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});