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
        production: [Production]
    }

    type Production {
        _id: ID!
        productionDate: Date!
        shiftReports: [ShiftReport]
    }

    type ShiftReport {
        _id: ID!
        leader: String
        operatorMachine: String
        qualityInspector: String
        efficiency: Float
        partNumber: [PartNumber]
        deadTime: [DeadTime]
    }

    type PartNumber {
        partNumber: String
        molde: String
        quantityGood: Int
        quantityScrap: Int
    }

    type DeadTime {
        issue: String
        deadTime: Int
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