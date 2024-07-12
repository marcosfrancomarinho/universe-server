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
remove.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        check.hasID(id);
        const response = await deletePlanetsID(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = remove;
