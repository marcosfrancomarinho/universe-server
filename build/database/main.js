"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    username: 'root',
    password: '151822',
    database: 'universe',
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
