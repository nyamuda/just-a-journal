"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a post schema
let postSchema = new mongoose_1.default.Schema({
    title: { type: String },
    content: { type: String },
    tags: { type: Array },
    summary: { type: String },
    status: { type: String },
    comment_count: { type: Number },
    like_count: { type: Number },
    author_id: { type: Number },
    category_id: { type: Number },
}, {
    timestamps: true
});
//create post model
let Post = mongoose_1.default.model("Post", postSchema, "posts");
exports.Post = Post;
