"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a comment schema
let commentSchema = new mongoose_1.default.Schema({
    content: { type: String },
    post_id: { type: Number },
    author_id: { type: Number },
    like_count: { type: Number, default: 0 }
}, {
    timestamps: true
});
//create a comment model
let Comment = mongoose_1.default.model("Comment", commentSchema, "comments");
exports.Comment = Comment;
