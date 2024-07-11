"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const insert_1 = require("../../database/insert");
const validate_1 = require("../../database/validate");
const create = express_1.default.Router();
const check = new validate_1.CheckError.Validate();
const { createPlanets } = insert_1.InsertDB;
create.post('/', async (req, res) => {
    try {
        const { name, code, satellites } = req.body;
        check.verificationDatas(name, code, satellites);
        const response = await createPlanets(name, code, satellites);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = create;
