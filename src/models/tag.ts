import mongoose from "mongoose";

//create a tag schema
let tagSchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    {
        timestamps: true
    }
)

//create a tag model

let Tag = mongoose.model("Tag", tagSchema, "tags");

export { Tag }


