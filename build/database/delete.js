"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDB = void 0;
const model_1 = __importDefault(require("./model"));
const validate_1 = require("./validate");
const check = new validate_1.CheckError.Validate();
var DeleteDB;
(function (DeleteDB) {
    async function deletePlanetsID(id) {
        try {
            check.hasID(id);
            const dataDelete = await model_1.default.destroy({
                where: { id: id }
            });
            check.itsVoid(dataDelete);
            return {
                message: 'Planeta deletado com sucesso',
                done: true,
            };
        }
        catch (error) {
            throw error;
        }
    }
    DeleteDB.deletePlanetsID = deletePlanetsID;
    async function deletePlanetsCode(code) {
        try {
            check.hasCode(code);
            const dataDelete = await model_1.default.destroy({
                where: { code: code.trim().toUpperCase() }
            });
            check.itsVoid(dataDelete);
            return {
                message: 'Planeta deletado com sucesso',
                done: true,
            };
        }
        catch (error) {
            throw error;
        }
    }
    DeleteDB.deletePlanetsCode = deletePlanetsCode;
})(DeleteDB || (exports.DeleteDB = DeleteDB = {}));
