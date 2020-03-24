import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `

    scalar Date

    type Query {
        productionReports: [ShiftReport]
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

    type injectionReport {
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
        production: [injectionProduction]
        deadTime: [DeadTime]
    }

    type injectionProduction {
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
        moldeSerial: String!
    }

    Issue {
        _id: ID!
        issueName: String!
    }




    type Mutation {
        createMachine (input: newMachineInput): Machine
    }

    newMachineInput {
        mmachineNumber: String
    }



`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});