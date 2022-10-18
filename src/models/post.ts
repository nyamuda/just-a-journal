import { number } from "joi";
import mongoose from "mongoose";


//create a post schema
let postSchema = new mongoose.Schema(
    {
        title: { type: String },
        content: { type: String },
        tags: { type: Array },
        summary: { type: String },
        status: { type: String },
        comment_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        author_id: { type: Number },
        category: { type: String, default: "miscellaneous" },

    },
    {
        timestamps: true
    }
)

//create post model
let Post = mongoose.model("Post", postSchema, "posts");

export { Post }