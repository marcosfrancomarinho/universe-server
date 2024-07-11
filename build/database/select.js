"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDB = void 0;
const sequelize_1 = require("sequelize");
const model_1 = __importDefault(require("./model"));
const validate_1 = require("./validate");
const check = new validate_1.CheckError.Validate();
var SelectDB;
(function (SelectDB) {
    const attr = [
        'id', 'name',
        'code', 'satellites'
    ];
    async function searchPlanetsID(id) {
        try {
            check.hasID(id);
            const response = await model_1.default.findByPk(id, {
                raw: true,
                attributes: attr
            });
            check.itsNull(response);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    SelectDB.searchPlanetsID = searchPlanetsID;
    async function searchPlanetsName(name) {
        try {
            check.hasName(name);
            const response = await model_1.default.findAll({
                where: {
                    name: { [sequelize_1.Op.like]: `%${name.trim()}%` }
                },
                attributes: attr,
                raw: true
            });
            check.itsNull(response);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    SelectDB.searchPlanetsName = searchPlanetsName;
    async function searchPlanetsCode(code) {
        try {
            check.hasCode(code);
            const response = await model_1.default.findOne({
                where: {
                    code: code.toUpperCase().trim()
                },
                attributes: attr,
                raw: true
            });
            check.itsNull(response);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    SelectDB.searchPlanetsCode = searchPlanetsCode;
})(SelectDB || (exports.SelectDB = SelectDB = {}));
