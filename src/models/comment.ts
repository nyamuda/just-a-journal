import { Schema, model } from "mongoose";



let authorSchema = new Schema({
    name: { type: String },
    email: { type: String }

})
let postSchema = new Schema({
    title: String,
    content: String,
    tags: [String],
    summary: String,
    status: String,
    comment_count: Number,
    like_count: Number,
    category: String
})

//create a comment schema
let commentSchema = new Schema(
    {
        content: { type: String },
        post: postSchema,
        author: authorSchema,
        like_count: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

//create a comment model

let Comment = model("Comment", commentSchema, "comments");

export { Comment }


