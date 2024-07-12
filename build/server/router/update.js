"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../database/validate");
const alter_1 = require("../../database/alter");
const update = express_1.default.Router();
const check = new validate_1.CheckError.Validate();
const { updateCode, updateName, updateSatellite } = alter_1.AlterDB;
class UpdatePlanets {
    async alterName(id, name, res) {
        check.hasIdAndName(id, name);
        const response = await updateName(id, name);
        this.sendResponse(res, response);
    }
    async alterCode(id, code, res) {
        check.checkIdCode(id, code);
        const response = await updateCode(id, code);
        this.sendResponse(res, response);
    }
    async alterSatellites(id, satellites, res) {
        check.hasIdAndSatellites(id, satellites);
        const response = await updateSatellite(id, satellites);
        this.sendResponse(res, response);
    }
    sendResponse(res, response) {
        res.status(200).json(response);
    }
}
update.put('/', async (req, res) => {
    try {
        const updatePlanets = new UpdatePlanets();
        const { id, name, code, satellites } = req.body;
        check.checkAllDatas(code, name, satellites);
        if (name)
            return await updatePlanets.alterName(id, name, res);
        if (code)
            return await updatePlanets.alterCode(id, code, res);
        if (satellites)
            return await updatePlanets.alterSatellites(id, satellites, res);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = update;
