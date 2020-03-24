import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

const typeDefs = `

    scalar Date

    type Query {
        machines: [Machine] 
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
        moldeSerial: String!
        moldeNumber: String!
    }

    type Issue {
        _id: ID!
        issueName: String!
    }


    type Mutation {
        newMachine(_id: ID, input: NewMachine): Machine
        newMolde(_id: ID, input: NewMolde): Molde
    }

    input NewMachine {
        machineNumber: String!
        machineSerial: String!
    }

    input NewMolde {
        moldeSerial: String!
        moldeNumber: String!
    }



`;

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});