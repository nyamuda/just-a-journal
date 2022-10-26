import { Schema, model } from "mongoose";
import { IPost } from "../utils/functions"





let authorSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false }
})

let STATUSES = ["publish", "draft"];
//create a post schema
let postSchema: Schema = new Schema<IPost>(
    {
        title: String,
        content: String,
        tags: [String],
        summary: String,
        status: { type: String, default: "publish", enum: STATUSES },
        comment_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        author: authorSchema,
        category: { type: String, default: "miscellaneous" }

    },
    {
        timestamps: true
    }
)

//create post model
let Post = model<IPost>("Post", postSchema, "posts");

export { Post, postSchema }