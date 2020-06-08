import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";


const typeDefs = `
    scalar Decimal
    scalar Date

    type Query {
        users: [User]
        machines: [Machine] 
        moldes: [Molde]
        materials: [Material]
        parts: [PartNumber]
        issues: [Issue]
        defects: [Defect]
        programs: [Program]
        reports: [InjectionReport]
        downtimeByDate(initial: Date, end: Date): [FlatDownTime]
        defectsByDate(initial: Date, end: Date): [FlatDefect]
        resinesByDate(initial: Date, end: Date): [FlatResine]
        productionByDate(initial: Date, end: Date): [Flat]
    }

    type Flat {
        report: ID
        date: String
        shift: String
        machine: ID
        part: ID
        molde: ID
        real: Int
        ng: Int
        ok: Int
        plan: Int
        wtime: Decimal
        dtime: Decimal
        availability: Decimal
        performance: Decimal
        quality: Decimal
        oee: Decimal
    }

    type FlatDownTime {
        report: ID
        date: String
        shift: String
        machine: ID
        issue: ID
        issueName: String
        issueCode: String
        mins: Int
    }

    type FlatDefect {
        report: ID
        date: String
        shift: String
        machine: ID
        defect: ID
        defectCode: String
        defectName: String
        partNumber: ID
        partName: String
        molde: ID
        moldeNumber: String
        defectPcs: Int
    }

    type FlatResine {
        report: ID
        date: String
        shift: String
        machine: ID
        resine: ID
        resineName: String
        purge: Int
        acronym: String
        color: String
    }

    type Machine {
        _id: ID!
        machineNumber: String!
        machineSerial: String!
        closingForce: Int
        spindleDiameter: Int
        reports: [InjectionReport]
    }

    type User {
        _id: ID!
        name: String!
        password: String!
        level: String!
        active: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type Material{
        _id: ID!
        number: String
        manufacturer: String
        description: String
        color: String
        acronym: String
        identification: String
        type: String
        unit: String
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
        TReal: Int
        TNG: Int
        TOK: Int
        TPlan: Int
        TWTime: Decimal
        TDTime: Decimal
        TAvailability: Decimal
        TPerformance: Decimal
        TQuality: Decimal
        TOEE: Decimal
        production: [InjectionProduction]
        defects: [DefectProduction]
        downtimeDetail: [DowntimeDetail]
        resines: [Resine]
    }

    type Resine{
        _id: ID!
        resine: Material
        purge: Int
    }

    type DefectProduction{
        _id: ID!
        defect: Defect
        defectPcs: Int
        molde: Molde
        partNumber: PartNumber
        program: Program
    }

    type InjectionProduction {
        _id: ID!
        program: Program
        partNumber: PartNumber
        molde: Molde
        real: Int
        ng: Int
        ok: Int
        plan: Int
        wtime: Decimal
        dtime: Decimal
        availability: Decimal
        performance: Decimal
        quality: Decimal
        oee: Decimal
    }

    type DowntimeDetail {
        _id: ID!
        issueId: Issue
        mins: Int
    }

    type PartNumber {
        _id: ID!
        partNumber: String
        partName: String
        family: String
    }

    type Molde {
        _id: ID!
        moldeNumber: String!
        moldeSerial: String!
        cavities: Int
        lifecycles: Int
    }

    type Issue {
        _id: ID!
        issueName: String!
        issueCode: String
    }

    type Defect {
        _id: ID!
        defectName: String!
        defectCode: String
        isInjection: Boolean!
    }

    type Program {
        _id: ID!
        machineNumber: Machine!
        moldeNumber: Molde!
        partNumber: PartNumber!
        cycleTime: Decimal
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

        newMaterial(_id: ID, input: NewMaterial): Material
        updateMaterial(_id: ID, input: NewMaterial): Material

        newPartNumber(_id: ID, input: NewPartNumber): PartNumber
        updatePartNumber(_id: ID, input: NewPartNumber): PartNumber

        newIssue(_id: ID, input: NewIssue): Issue
        updateIssue(_id: ID, input: NewIssue): Issue

        newDefect(_id: ID, input: NewDefect): Defect
        updateDefect(_id: ID, input: NewDefect): Defect

        newProgram(_id: ID, input: NewProgram): Program
        updateProgram(_id: ID, input: NewProgram): Program

        newUser(_id: ID, input: NewUser): User
        updateUser(_id: ID, input: UpdateUser): User
    }

    input NewUser {
        name: String!
        level: String!
        password: String!
    }

    input UpdateUser {
        password: String!
        active: Boolean!
        updatedAt: Date
    }

    input NewMachine {
        machineNumber: String!
        machineSerial: String!
        closingForce: Int!
        spindleDiameter: Int!
    }

    input NewMolde {
        moldeNumber: String!
        moldeSerial: String!
        cavities: Int!
        lifecycles: Int!
    }

    input NewPartNumber {
        partNumber: String!
        partName: String!
        family: String!
    }

    input NewIssue {
        issueName: String!
        issueCode: String!
    }

    input NewMaterial {
        number: String!
        manufacturer: String!
        description: String!
        color: String!
        acronym: String!
        identification: String!
        type: String!
        unit: String!
    }

    input NewDefect {
        defectName: String!
        defectCode: String!
        isInjection: Boolean
    }

    input NewProgram {
        machineNumber: ID
        moldeNumber: ID
        partNumber: ID
        cycleTime: Decimal!
        cycles: Int!
        capacity: Int!
    }

    input NewInjectionReport {
        reportDate: Date
        shift: String
        machine: ID
        TReal: Int
        TNG: Int
        TOK: Int
        TPlan: Int
        TWTime: Decimal
        TDTime: Decimal
        TAvailability: Decimal
        TPerformance: Decimal
        TQuality: Decimal
        TOEE: Decimal
        production: [InjectionProductionInput]
        downtimeDetail: [DowntimeDetailInput]
        defects: [DefectsInput]
        resines: [ResinesInput]
    }

    input InjectionProductionInput {
        program: ID
        partNumber: ID
        molde: ID
        real: Int
        ng: Int
        ok: Int
        plan: Int
        wtime: Decimal
        dtime: Decimal
        availability: Decimal
        performance: Decimal
        quality: Decimal
        oee: Decimal
    }

    input DefectsInput{
        defect: ID
        defectPcs: Int
        molde: ID
        partNumber: ID
        program: ID
    }

    input ResinesInput{
        resine: ID
        purge: Int
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