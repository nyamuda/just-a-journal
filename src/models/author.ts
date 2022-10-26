import { Schema, model } from "mongoose";



interface IAuthor {
    name: string,
    email: string,
    password: string,
    admin: boolean,
    posts: Array<object>
}


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

//create a user schema
let authorSchema: Schema = new Schema<IAuthor>(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        admin: { type: Boolean, default: false },
        posts: [postSchema]
    },
    {
        timestamps: true
    }
)

//create a user model

let Author = model<IAuthor>("Author", authorSchema, "authors");

export { Author, authorSchema }


