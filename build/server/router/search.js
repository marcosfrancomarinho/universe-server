"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../database/validate");
const select_1 = require("../../database/select");
const search = express_1.default.Router();
const check = new validate_1.CheckError.Validate();
const { searchPlanetsID, searchPlanetsCode, searchPlanetsName } = select_1.SelectDB;
class SelectPlanets {
    async selectID(id, res) {
        check.hasID(id);
        const response = await searchPlanetsID(id);
        this.sendResponse(res, response);
    }
    async selectCode(code, res) {
        check.hasCode(code);
        const response = await searchPlanetsCode(code);
        this.sendResponse(res, response);
    }
    async selectName(name, res) {
        check.hasName(name);
        const response = await searchPlanetsName(name);
        this.sendResponse(res, response);
    }
    sendResponse(res, response) {
        res.status(200).json(response);
    }
}
search.get('/', async (req, res) => {
    try {
        const select = new SelectPlanets();
        const { id, code, name } = req.query;
        check.checkResponse(id, code, name);
        if (id)
            return await select.selectID(id, res);
        if (code)
            return await select.selectCode(code, res);
        if (name)
            return await select.selectName(name, res);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = search;
