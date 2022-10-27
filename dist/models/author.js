"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = exports.Author = void 0;
const mongoose_1 = require("mongoose");
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
//create a user schema
let authorSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false },
    posts: [postSchema]
}, {
    timestamps: true
});
exports.authorSchema = authorSchema;
//create a user model
let Author = (0, mongoose_1.model)("Author", authorSchema, "authors");
exports.Author = Author;
