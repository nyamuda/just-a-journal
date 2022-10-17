import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const url = `mongodb+srv://tnyamuda:${process.env.PASSWORD}@cluster0.vpaqxqq.mongodb.net/?retryWrites=true&w=majority`;
const options = {
    dbName: "just_a_journal"
}

//connecting to the database
let connect_database = async () => {
    try {
        await mongoose.connect(url, options);
    } catch (error) {
        console.log("Failed to connect to the database");
    }
}


export { connect_database };
export * from "./author";
export * from "./category";
export * from "./post";
export * from "./tag";
export * from "./comment"
