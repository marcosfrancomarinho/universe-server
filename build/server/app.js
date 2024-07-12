"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const create_1 = __importDefault(require("./router/create"));
const search_1 = __importDefault(require("./router/search"));
const remove_1 = __importDefault(require("./router/remove"));
const update_1 = __importDefault(require("./router/update"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/create', create_1.default);
app.use('/search', search_1.default);
app.use('/remove', remove_1.default);
app.use('/update', update_1.default);
app.listen(PORT, () => {
    console.log(`Server online on port ${PORT}`);
});
