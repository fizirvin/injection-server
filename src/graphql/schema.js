import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `

    scalar Date

    type Query {
        machines: [Machine] 
        moldes: [Molde]
        parts: [PartNumber]
        issues: [Issue]
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
        leader: String
        machine: Machine
        operatorMachine: String
        qualityInspector: String
        totalPiecesOK: Int
        totalPiecesNG: Int
        deadMin: Int
        efficiency: Float
        production: [InjectionProduction]
        deadTime: [DeadTime]
    }

    type InjectionProduction {
        _id: ID!
        partNumber: PartNumber
        molde: Molde
        ok: Int
        ng: Int
    }

    type DeadTime {
        _id: ID!
        issueId: Issue
        deadTime: Int
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
        molde: Molde!
        partNumber: PartNumber!
        cycles: Int!
        capacity: Int!
    }


    type Mutation {
        newMachine(_id: ID, input: NewMachine): Machine
        updateMachine(_id: ID, input: NewMachine): Machine

        newMolde(_id: ID, input: NewMolde): Molde
        updateMolde(_id: ID, input: NewMolde): Molde

        newPartNumber(_id: ID, input: NewPartNumber): PartNumber
        updatePartNumber(_id: ID, input: NewPartNumber): PartNumber

        newIssue(_id: ID, input: NewIssue): Issue
        updateIssue(_id: ID, input: NewIssue): Issue
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



`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});