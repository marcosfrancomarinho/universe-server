"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterDB = void 0;
const model_1 = __importDefault(require("./model"));
const validate_1 = require("./validate");
const check = new validate_1.CheckError.Validate();
var AlterDB;
(function (AlterDB) {
    async function updateName(id, name) {
        try {
            check.hasIdAndName(id, name);
            const alter = await model_1.default.update({ name: name.trim() }, { where: { id: id } });
            check.itsVoid(alter);
            return {
                message: `O nome do planeta foi alterado com sucesso`,
                done: true
            };
        }
        catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }
    AlterDB.updateName = updateName;
    async function updateCode(id, code) {
        try {
            check.hasIdAndCode(id, code);
            const alter = await model_1.default.update({ code: code.trim() }, { where: { id: id } });
            check.itsVoid(alter);
            return {
                message: `O código do planeta foi alterado com sucesso`,
                done: true
            };
        }
        catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }
    AlterDB.updateCode = updateCode;
    async function updateSatellite(id, satellites) {
        try {
            check.hasIdAndSatellites(id, satellites);
            const alter = await model_1.default.update({ satellites: satellites }, { where: { id: id } });
            check.itsVoid(alter);
            return {
                message: `Os satélites do planeta foram alterados com sucesso`,
                done: true
            };
        }
        catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }
    AlterDB.updateSatellite = updateSatellite;
})(AlterDB || (exports.AlterDB = AlterDB = {}));
