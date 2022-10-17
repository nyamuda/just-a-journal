"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a tag schema
let tagSchema = new mongoose_1.default.Schema({
    name: { type: String }
}, {
    timestamps: true
});
//create a tag model
let Tag = mongoose_1.default.model("Tag", tagSchema, "tags");
exports.Tag = Tag;
