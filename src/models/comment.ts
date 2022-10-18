import mongoose from "mongoose";

//create a comment schema
let commentSchema = new mongoose.Schema(
    {
        content: { type: String },
        post_id: { type: Number },
        author_id: { type: Number },
        like_count: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

//create a comment model

let Comment = mongoose.model("Comment", commentSchema, "comments");

export { Comment }


