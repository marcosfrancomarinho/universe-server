"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../database/validate");
const delete_1 = require("../../database/delete");
const remove = express_1.default.Router();
const check = new validate_1.CheckError.Validate();
const { deletePlanetsID, deletePlanetsCode } = delete_1.DeleteDB;
class RemovePlanets {
    async removePlanetsId(id, res) {
        check.hasID(id);
        const response = await deletePlanetsID(id);
        this.sendResponse(res, response);
    }
    async removePlanetsCode(code, res) {
        check.hasCode(code);
        const response = await deletePlanetsCode(code);
        this.sendResponse(res, response);
    }
    sendResponse(res, response) {
        res.status(200).json(response);
    }
}
remove.delete('/', async (req, res) => {
    try {
        const removePlanets = new RemovePlanets();
        const { id, code } = req.query;
        check.checkIdCode(id, code);
        if (id)
            return await removePlanets.removePlanetsId(id, res);
        if (code)
            return await removePlanets.removePlanetsCode(code, res);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = remove;
