import { bool } from "joi";
import mongoose from "mongoose";

//create a user schema
let authorSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        admin: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

//create a user model

let Author = mongoose.model("Author", authorSchema, "authors");

export { Author }


