"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
let authorSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String }
});
let postSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    tags: [String],
    summary: String,
    status: String,
    comment_count: Number,
    like_count: Number,
    category: String
});
//create a comment schema
let commentSchema = new mongoose_1.Schema({
    content: { type: String },
    post: postSchema,
    author: authorSchema,
    like_count: { type: Number, default: 0 }
}, {
    timestamps: true
});
//create a comment model
let Comment = (0, mongoose_1.model)("Comment", commentSchema, "comments");
exports.Comment = Comment;
