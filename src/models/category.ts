import mongoose from "mongoose";

//create a category schema
let categorySchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    {
        timestamps: true
    }
)

//create a category model

let Category = mongoose.model("Category", categorySchema, "categories");

export { Category }


