import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

import machines from "./models/machines.js";
import moldes from "./models/moldes.js";
import cleanings from "./models/cleanings";
import materials from "./models/materials.js";
import parts from "./models/parts.js";
import issues from "./models/issues.js";
import defects from "./models/defects.js";
import programs from "./models/programs.js";
import reports from "./models/reports.js";
import User from "./models/users.js";

import fullDate from "../functions/fullDate";
import shortDate from "../functions/shortDate";
import yearWeek from "../functions/yearWeek";
import zonedD from "../functions/zonedD";

function formatDate(format) {
  let formatDate;
  const date = new Date(format);
  const y = date.getFullYear();
  const d = date.getDate();
  const m = date.getMonth() + 1;

  function M() {
    if (m < 10) {
      return "0" + m;
    } else {
      return m;
    }
  }

  function D() {
    if (d < 10) {
      return "0" + d;
    } else {
      return d;
    }
  }

  const formatD = D();
  const formatM = M();
  formatDate = y + "-" + formatM + "-" + formatD;
  return formatDate;
}

export const resolvers = {
  Query: {
    async cleanings() {
      return await cleanings
        .find()
        .sort({ _id: 1 })
        .populate({ path: "molde", model: "moldes" });
    },
    async users() {
      const users = await User.find();
      const userFormat = users.map((item) => {
        const fullCat = fullDate(item.createdAt);
        const fullUat = fullDate(item.updatedAt);
        const shortCat = shortDate(item.createdAt);
        return { ...item._doc, fullCat, fullUat, shortCat };
      });
      return userFormat;
    },
    async login(_, { name, password }) {
      const user = await User.findOne({ name: name });
      if (!user) {
        const error = new Error("User is incorrect.");
        error.code = 401;
        throw error;
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error("Password is incorrect.");
        error.code = 402;
        throw error;
      }
      if (!user.active) {
        const error = new Error("User is incorrect.");
        error.code = 403;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          name: user.name,
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      return { token: token, userId: user._id, name: user.name };
    },
    async machines() {
      return await machines.find().sort({ _id: 1 });
    },
    async materials() {
      return await materials.find().sort({ _id: 1 });
    },
    async daytotalpurge() {
      return await reports.find().then((report) => {
        const uniqueReportList = Array.from(
          new Set(
            report.map(({ reportDate }) => {
              const reduce = report.find(
                (item) => item.reportDate.toString() === reportDate.toString()
              );
              return reduce;
            })
          )
        );

        const convert = uniqueReportList.map((item) => {
          const filter = report.filter(
            (i) => i.reportDate.toString() === item.reportDate.toString()
          );

          const convert = filter.map((it) => {
            const production = it.resines.map((resine) => {
              return {
                purge: resine.purge,
              };
            });
            return production;
          });
          const flat = [].concat.apply([], convert);
          const reducePurge = flat.reduce((a, b) => {
            return a + b.purge || 0;
          }, 0);

          return {
            date: shortDate(item.reportDate),
            purge: reducePurge,
          };
        });
        return convert;
      });
    },
    async daytotalrecord() {
      return await reports.find().then((report) => {
        const uniqueReportList = Array.from(
          new Set(
            report.map(({ reportDate }) => {
              const reduce = report.find(
                (item) => item.reportDate.toString() === reportDate.toString()
              );
              return reduce;
            })
          )
        );

        const convert = uniqueReportList.map((item) => {
          const filter = report.filter(
            (i) => i.reportDate.toString() === item.reportDate.toString()
          );
          const reducePlan = filter.reduce((a, b) => {
            return a + b.TPlan || 0;
          }, 0);
          const reduceNG = filter.reduce((a, b) => {
            return a + b.TNG || 0;
          }, 0);

          const reduceOK = filter.reduce((a, b) => {
            return a + b.TOK || 0;
          }, 0);

          return {
            date: shortDate(item.reportDate),
            ng: reduceNG,
            ok: reduceOK,
            remainning: reducePlan - reduceNG - reduceOK,
          };
        });
        return convert;
      });
    },
    async weektotalpurge() {
      return await reports.find().then((report) => {
        const weekreports = report.map((week) => {
          return {
            date: yearWeek(week.reportDate),
            resines: week.resines,
          };
        });

        const uniqueReportList = Array.from(
          new Set(
            weekreports.map(({ date }) => {
              const reduce = weekreports.find(
                (item) => item.date.toString() === date
              );
              return reduce;
            })
          )
        );

        const convert = uniqueReportList.map((item) => {
          const filter = report.filter(
            (i) => yearWeek(i.reportDate) === item.date
          );

          const convert = filter.map((it) => {
            const production = it.resines.map((resine) => {
              return {
                purge: resine.purge,
              };
            });
            return production;
          });
          const flat = [].concat.apply([], convert);
          const reducePurge = flat.reduce((a, b) => {
            return a + b.purge || 0;
          }, 0);

          return {
            week: item.date,
            purge: reducePurge,
          };
        });

        return convert.sort((a, b) => (a.week > b.week ? 1 : -1));
      });
    },
    async weektotalrecord() {
      return await reports.find().then((report) => {
        const weekreports = report.map((week) => {
          return {
            date: yearWeek(week.reportDate),
            ng: week.TNG,
            plan: week.TPlan,
            ok: week.TOK,
            ng: week.TNG,
          };
        });

        const uniqueReportList = Array.from(
          new Set(
            weekreports.map(({ date }) => {
              const reduce = weekreports.find(
                (item) => item.date.toString() === date
              );
              return reduce;
            })
          )
        );

        const convert = uniqueReportList.map((item) => {
          const filter = report.filter(
            (i) => yearWeek(i.reportDate) === item.date
          );
          const reducePlan = filter.reduce((a, b) => {
            return a + b.TPlan || 0;
          }, 0);
          const reduceNG = filter.reduce((a, b) => {
            return a + b.TNG || 0;
          }, 0);

          const reduceOK = filter.reduce((a, b) => {
            return a + b.TOK || 0;
          }, 0);

          return {
            week: item.date,
            ng: reduceNG,
            ok: reduceOK,
            remainning: reducePlan - reduceNG - reduceOK,
          };
        });
        return convert.sort((a, b) => (a.week > b.week ? 1 : -1));
      });
    },
    async tcycles() {
      const moldesArray = await moldes.find();

      return await reports.find().then((report) => {
        const array = [...report];
        const convert = array.map((item) => {
          const production = item.production.map((prod) => {
            return {
              molde: prod.molde.toString(),
              cycles: prod.cycles || 0,
            };
          });
          return production;
        });

        const flat = [].concat.apply([], convert);
        console.log(flat.length);
        const tcycles = moldesArray.map((molde) => {
          const reduce = flat
            .filter((item) => item.molde.toString() === molde._id.toString())
            .reduce((a, b) => {
              return a + b.cycles || 0;
            }, 0);

          return { molde: molde._id, tcycles: reduce };
        });

        return tcycles;
      });
    },
    async cycles(_, { cleaning }) {
      let finalDate = new Date();
      const cleaningDoc = await cleanings.findById(cleaning);
      const { molde, date, shift, active, end, shiftEnd } = cleaningDoc;

      // const after = await cleanings.find({molde, date: { $gt: initial}})
      if (!active) {
        finalDate = end + "T23:59:59.000Z";
      }

      return await reports
        .find({
          "production.molde": molde,
          reportDate: { $gte: date, $lte: finalDate },
        })
        .sort({ reportDate: 1 })
        .then((report) => {
          const array = [...report];
          const convert = array.map((item) => {
            const date = formatDate(item.reportDate);
            const id = item._id;
            const shift = item.shift;
            const machine = item.machine;
            const production = item.production.map((prod) => {
              return {
                report: id,
                date: date,
                shift: shift,
                machine: machine,
                part: prod.partNumber,
                molde: prod.molde,
                real: prod.real,
                cycles: prod.cycles,
              };
            });
            return production;
          });
          const flat = [].concat.apply([], convert);

          if (shift === "2") {
            const removeItem = flat.find(
              (item) => item.date === date && item.shift === "1"
            );
            if (!removeItem) {
              return flat;
            } else {
              return flat.filter((item) => item.report !== removeItem.report);
            }
          }
          if (!active && shiftEnd === "1") {
            const removeItem = flat.find(
              (item) => item.date === end && item.shift === "2"
            );
            if (!removeItem) {
              return flat;
            } else {
              return flat.filter((item) => item.report !== removeItem.report);
            }
          }
          return flat;
        });
    },
    async selectedCycles() {
      const finalDate = new Date();
      const cleans = await cleanings.find({ active: true });
      let cycles = [];

      for (const item of cleans) {
        const { molde, date, shift } = item;
        const array = await reports
          .find({
            "production.molde": molde,
            reportDate: { $gte: date, $lte: finalDate },
          })
          .sort({ reportDate: 1 });
        const convert = array.map((item) => {
          const date = formatDate(item.reportDate);
          const id = item._id;
          const shift = item.shift;
          const machine = item.machine;
          const production = item.production.map((prod) => {
            return {
              report: id,
              date: date,
              shift: shift,
              machine: machine,
              part: prod.partNumber,
              molde: prod.molde,
              real: prod.real,
              cycles: prod.cycles,
            };
          });
          return production;
        });

        const flat = [].concat.apply([], convert);
        if (shift === "2") {
          const removeItem = flat.find(
            (item) => item.date === date && item.shift === "1"
          );
          cycles = [
            ...cycles,
            ...flat.filter((item) => item.report !== removeItem.report),
          ];
        }

        cycles = [...cycles, ...flat];
      }

      const responses = await Promise.all(cycles);

      return responses;
    },
    async moldes() {
      return await moldes.find().sort({ _id: 1 });
    },
    async parts() {
      return await parts.find().sort({ _id: 1 });
    },
    async issues() {
      return await issues.find().sort({ _id: 1 });
    },
    async defects() {
      return await defects.find().sort({ defectName: 1 });
    },
    async programs() {
      return await programs
        .find()
        .populate({ path: "machineNumber", model: "machines" })
        .populate({ path: "moldeNumber", model: "moldes" })
        .populate({ path: "partNumber", model: "parts" })
        .sort({ _id: 1 });
    },
    async reports(_, { page, add }) {
      if (!page) {
        page = 1;
      }
      if (!add) {
        add = 0;
      }
      const perPage = 100;
      const totalReports = await reports.find().countDocuments();
      const report = await reports
        .find()
        .skip((page - 1) * perPage + add)
        .limit(perPage)
        .populate({ path: "machine", model: "machines" })
        .populate({ path: "production.program", model: "programs" })
        .populate({ path: "production.partNumber", model: "parts" })
        .populate({ path: "production.molde", model: "moldes" })
        .populate({ path: "defects.defect", model: "defects" })
        .populate({ path: "userId", model: "User" })
        .populate({ path: "defects.molde", model: "moldes" })
        .populate({ path: "defects.partNumber", model: "parts" })
        .populate({ path: "defects.program", model: "programs" })
        .populate({ path: "downtimeDetail.issueId", model: "issues" })
        .populate({ path: "resines.resine", model: "materials" })
        .sort({ reportDate: -1 });

      const rep = report.map((item) => {
        const { createdAt, updatedAt } = item;

        const fullcreatedAt = fullDate(createdAt);
        const fullupdatedAt = fullDate(updatedAt);
        return {
          ...item._doc,
          createdAt: fullcreatedAt,
          updatedAt: fullupdatedAt,
        };
      });
      return { totalReports: totalReports, reports: rep };
    },
    async downtimeByDate(parent, args) {
      return await reports
        .find({ reportDate: { $gte: args.initial, $lte: args.end } })
        .populate({ path: "downtimeDetail.issueId", model: "issues" })
        .sort({ reportDate: -1 })
        .then((report) => {
          const array = [...report];
          const convert = array.map((item) => {
            const date = formatDate(item.reportDate);
            const id = item._id;
            const shift = item.shift;
            const machine = item.machine;
            const downtime = item.downtimeDetail.map((downtime) => {
              return {
                report: id,
                date: date,
                shift: shift,
                machine: machine,
                issue: downtime.issueId._id,
                issueName: downtime.issueId.issueName,
                issueCode: downtime.issueId.issueCode,
                mins: downtime.mins,
              };
            });
            return downtime;
          });
          let flatDownTime = [].concat.apply([], convert);

          return flatDownTime;
        });
    },
    async defectsByDate(parent, args) {
      return await reports
        .find({ reportDate: { $gte: args.initial, $lte: args.end } })
        .populate({ path: "defects.defect", model: "defects" })
        .populate({ path: "defects.molde", model: "moldes" })
        .populate({ path: "defects.partNumber", model: "parts" })
        .sort({ reportDate: -1 })
        .then((report) => {
          const array = [...report];
          const convert = array.map((item) => {
            const date = formatDate(item.reportDate);
            const id = item._id;
            const shift = item.shift;
            const machine = item.machine;
            const defect = item.defects.map((defect) => {
              return {
                report: id,
                date: date,
                shift: shift,
                machine: machine,
                defect: defect.defect._id,
                defectCode: defect.defect.defectCode,
                defectName: defect.defect.defectName,
                partNumber: defect.partNumber._id,
                partName: defect.partNumber.partName,
                molde: defect.molde._id,
                moldeNumber: defect.molde.moldeNumber,
                defectPcs: defect.defectPcs,
              };
            });
            return defect;
          });
          let flatDefect = [].concat.apply([], convert);

          return flatDefect;
        });
    },
    async resinesByDate(parent, args) {
      return await reports
        .find({ reportDate: { $gte: args.initial, $lte: args.end } })
        .populate({ path: "resines.resine", model: "materials" })
        .sort({ reportDate: -1 })
        .then((report) => {
          const array = [...report];
          const convert = array.map((item) => {
            const date = formatDate(item.reportDate);
            const id = item._id;
            const shift = item.shift;
            const machine = item.machine;
            const resines = item.resines.map((resine) => {
              return {
                report: id,
                date: date,
                shift: shift,
                machine: machine,
                resine: resine.resine._id,
                resineName: resine.resine.description,
                purge: resine.purge,
                acronym: resine.resine.acronym,
                color: resine.resine.color,
              };
            });
            return resines;
          });
          let flatResine = [].concat.apply([], convert);

          return flatResine;
        });
    },
    async productionByDate(parent, args) {
      return await reports
        .find({ reportDate: { $gte: args.initial, $lte: args.end } })
        .populate({ path: "machine", model: "machines" })
        .populate({ path: "production.partNumber", model: "parts" })
        .populate({ path: "production.molde", model: "moldes" })
        .sort({ reportDate: 1 })
        .then((report) => {
          const array = [...report];
          const convert = array.map((item) => {
            const date = formatDate(item.reportDate);
            const id = item._id;
            const shift = item.shift;
            const machine = item.machine._id;
            const machineNumber = item.machine.machineNumber;
            const production = item.production.map((prod) => {
              return {
                report: id,
                date: date,
                shift: shift,
                machine: machine,
                machineNumber: machineNumber,
                part: prod.partNumber._id,
                partName: prod.partNumber.partName,
                molde: prod.molde._id,
                moldeNumber: prod.molde.moldeNumber,
                real: prod.real,
                ng: prod.ng,
                ok: prod.ok,
                plan: prod.plan,
                wtime: prod.wtime,
                dtime: prod.dtime,
                availability: prod.availability,
                performance: prod.performance,
                quality: prod.quality,
                oee: prod.oee,
              };
            });
            return production;
          });
          let flat = [].concat.apply([], convert);
          return flat;
        });
    },
  },
  Mutation: {
    async newCleaning(_, { input }) {
      // let counted
      // const last_cycle = await cleanings.findOne({molde: input.molde}).sort({cycles: -1})
      // if(!last_cycle){ counted = 0}
      // else{ counted = input.cycles - last_cycle._doc.cycles }
      input.active = true;
      const newCleaning = new cleanings(input);
      return await newCleaning
        .save()
        .then((newCleaning) =>
          cleanings
            .findOne({ _id: newCleaning._id })
            .populate({ path: "molde", model: "moldes" })
        );
    },
    async updateCleaning(_, { _id, input }) {
      // const oldCleaning = await cleanings.findById(_id)
      // let counted
      // const last_cycle = await cleanings.findOne({molde: input.molde, cycles:{$lt: oldCleaning.cycles} }).sort({cycles: -1})
      // if(!last_cycle){ counted = 0}
      // else{ counted = input.cycles - last_cycle._doc.cycles }
      // input.counted = counted
      return await cleanings
        .findByIdAndUpdate(_id, input, { new: true })
        .populate({ path: "molde", model: "moldes" });
    },
    async finishCleaning(_, { _id, input }) {
      input.active = false;
      return await cleanings
        .findByIdAndUpdate(_id, input, { new: true })
        .populate({ path: "molde", model: "moldes" });
    },
    async newMachine(_, { input }) {
      const newMachine = new machines(input);
      await newMachine.save();
      return newMachine;
    },
    async updateMachine(_, { _id, input }) {
      return await machines.findByIdAndUpdate(_id, input, { new: true });
    },
    async newMolde(_, { input }) {
      input.active = true;
      const newMolde = new moldes(input);
      await newMolde.save();
      return newMolde;
    },
    async updateMolde(_, { _id, input }) {
      return await moldes.findByIdAndUpdate(_id, input, { new: true });
    },
    async newPartNumber(_, { input }) {
      const newPartNumber = new parts(input);
      await newPartNumber.save();
      return newPartNumber;
    },
    async updatePartNumber(_, { _id, input }) {
      return await parts.findByIdAndUpdate(_id, input, { new: true });
    },
    async newIssue(_, { input }) {
      const newIssue = new issues(input);
      await newIssue.save();
      return newIssue;
    },
    async updateIssue(_, { _id, input }) {
      return await issues.findByIdAndUpdate(_id, input, { new: true });
    },
    async newMaterial(_, { input }) {
      const newMaterial = new materials(input);
      await newMaterial.save();
      return newMaterial;
    },
    async updateMaterial(_, { _id, input }) {
      return await materials.findByIdAndUpdate(_id, input, { new: true });
    },
    async newDefect(_, { input }) {
      const newDefect = new defects(input);
      await newDefect.save();
      return newDefect;
    },
    async updateDefect(_, { _id, input }) {
      return await defects.findByIdAndUpdate(_id, input, { new: true });
    },
    async newProgram(_, { input }) {
      const newProgram = new programs(input);

      return await newProgram
        .save()
        .then((newProgram) =>
          programs
            .findOne({ _id: newProgram._id })
            .populate({ path: "machineNumber", model: "machines" })
            .populate({ path: "moldeNumber", model: "moldes" })
            .populate({ path: "partNumber", model: "parts" })
        );
    },
    async updateProgram(_, { _id, input }) {
      return await programs
        .findByIdAndUpdate(_id, input, { new: true })
        .populate({ path: "machineNumber", model: "machines" })
        .populate({ path: "moldeNumber", model: "moldes" })
        .populate({ path: "partNumber", model: "parts" });
    },
    async newInjectionReport(_, { input }) {
      const date = new Date();
      const zonedDate = zonedD(date);

      const newReport = new reports({
        ...input,
        createdAt: zonedDate,
      });
      const already = await reports.find({
        machine: newReport.machine,
        reportDate: newReport.reportDate,
        shift: newReport.shift,
      });
      if (!already.length == 0) {
        const error = new Error("already reported");
        throw error;
      }

      const report = await newReport
        .save()
        .then((newReport) =>
          reports
            .findOne({ _id: newReport._id })
            .populate({ path: "machine", model: "machines" })
            .populate({ path: "production.program", model: "programs" })
            .populate({ path: "production.partNumber", model: "parts" })
            .populate({ path: "production.molde", model: "moldes" })
            .populate({ path: "downtimeDetail.issueId", model: "issues" })
            .populate({ path: "defects.defect", model: "defects" })
            .populate({ path: "userId", model: "User" })
            .populate({ path: "defects.partNumber", model: "parts" })
            .populate({ path: "defects.molde", model: "moldes" })
            .populate({ path: "defects.program", model: "programs" })
            .populate({ path: "resines.resine", model: "materials" })
        );

      const { createdAt } = report;
      const fullcreatedAt = fullDate(createdAt);

      return { ...report._doc, createdAt: fullcreatedAt };
    },
    async updateInjectionReport(_, { _id, input }) {
      const date = new Date();
      const zonedDate = zonedD(date);
      const report = await reports
        .findByIdAndUpdate(
          _id,
          {
            ...input,
            updatedAt: zonedDate,
          },
          { new: true }
        )
        .populate({ path: "machine", model: "machines" })
        .populate({ path: "program", model: "programs" })
        .populate({ path: "production.partNumber", model: "parts" })
        .populate({ path: "production.molde", model: "moldes" })
        .populate({ path: "defects.defect", model: "defects" })
        .populate({ path: "userId", model: "User" })
        .populate({ path: "defects.partNumber", model: "parts" })
        .populate({ path: "defects.molde", model: "moldes" })
        .populate({ path: "defects.program", model: "programs" })
        .populate({ path: "downtimeDetail.issueId", model: "issues" })
        .populate({ path: "resines.resine", model: "materials" });

      const { updatedAt, createdAt } = report;
      const fullupdatedAt = fullDate(updatedAt);
      const fullcreatedAt = fullDate(createdAt);

      return {
        ...report._doc,
        updatedAt: fullupdatedAt,
        createdAt: fullcreatedAt,
      };
    },
    async newUser(_, { input }) {
      if (!validator.isLength(input.password, { min: 5 })) {
        const error = new Error("Password too short!");
        error.code = 422;
        throw error;
      }
      if (validator.isEmpty(input.password)) {
        const error = new Error("Invalid input.");
        error.code = 422;
        throw error;
      }
      const existingUser = await User.findOne({ name: input.name });
      if (existingUser) {
        const error = new Error("User exists already!");
        error.code = 500;
        throw error;
      }
      const date = new Date();
      const zonedDate = zonedD(date);
      const user = new User({
        ...input,
        active: true,
        createdAt: zonedDate,
        updatedAt: zonedDate,
        password: await bcrypt.hash(input.password, 12),
      });
      const createdUser = await user.save();
      const { createdAt, updatedAt } = createdUser._doc;
      const fullCat = fullDate(createdAt);
      const fullUat = fullDate(updatedAt);
      const shortCat = shortDate(createdAt);

      return { ...createdUser._doc, fullCat, fullUat, shortCat };
    },
    async updateUser(_, { _id, input }) {
      const date = new Date();
      const zonedDate = zonedD(date);
      const object = {
        ...input,
        updatedAt: zonedDate,
      };
      const updatedUser = await User.findByIdAndUpdate(_id, object, {
        new: true,
      });
      const { createdAt, updatedAt } = updatedUser._doc;
      const fullCat = fullDate(createdAt);
      const fullUat = fullDate(updatedAt);
      const shortCat = shortDate(createdAt);

      return { ...updatedUser._doc, fullCat, fullUat, shortCat };
    },
  },
};
