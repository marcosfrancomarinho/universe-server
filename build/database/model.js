"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const main_1 = __importDefault(require("./main"));
const Planets = main_1.default.define('planetas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    satellites: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    }
}, {
    tableName: 'planetas',
    timestamps: true,
});
exports.default = Planets;
