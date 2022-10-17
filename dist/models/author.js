"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a user schema
let authorSchema = new mongoose_1.default.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false }
}, {
    timestamps: true
});
//create a user model
let Author = mongoose_1.default.model("Author", authorSchema, "authors");
exports.Author = Author;
