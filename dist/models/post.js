"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let STATUSES = ["publish", "draft"];
//create a post schema
let postSchema = new mongoose_1.default.Schema({
    title: { type: String },
    content: { type: String },
    tags: { type: Array },
    summary: { type: String },
    status: { type: String, default: "publish", enum: STATUSES },
    comment_count: { type: Number, default: 0 },
    like_count: { type: Number, default: 0 },
    author_id: { type: Number },
    category: { type: String, default: "miscellaneous" },
}, {
    timestamps: true
});
//create post model
let Post = mongoose_1.default.model("Post", postSchema, "posts");
exports.Post = Post;
