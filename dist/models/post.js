"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.Post = void 0;
const mongoose_1 = require("mongoose");
let authorSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String }
});
let commentSchema = new mongoose_1.Schema({
    content: String
});
let STATUSES = ["publish", "draft"];
//create a post schema
let postSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    tags: [String],
    summary: String,
    status: { type: String, default: "publish", enum: STATUSES },
    comments: [commentSchema],
    like_count: { type: Number, default: 0 },
    author: authorSchema,
    category: { type: String, default: "miscellaneous" }
}, {
    timestamps: true
});
exports.postSchema = postSchema;
//create post model
let Post = (0, mongoose_1.model)("Post", postSchema, "posts");
exports.Post = Post;
