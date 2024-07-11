"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertDB = void 0;
const model_1 = __importDefault(require("./model"));
const validate_1 = require("./validate");
const check = new validate_1.CheckError.Validate();
var InsertDB;
(function (InsertDB) {
    async function createPlanets(name, code, satellites) {
        try {
            check.verificationDatas(name, code, satellites);
            await model_1.default.create({
                name: name,
                code: code.trim().toUpperCase(),
                satellites: satellites
            });
            const response = {
                message: `Planeta ${name} foi criado com sucesso`,
                done: true
            };
            return response;
        }
        catch (error) {
            check.uniquePlanets(error);
            throw error;
        }
    }
    InsertDB.createPlanets = createPlanets;
})(InsertDB || (exports.InsertDB = InsertDB = {}));
