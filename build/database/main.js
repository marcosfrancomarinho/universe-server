"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://gsuhelcb:HZ17wkhBtEprABlbFX_CTriLvh2oiWNt@isabelle.db.elephantsql.com/gsuhelcb', {
    dialect: 'postgres'
});
exports.default = sequelize;
