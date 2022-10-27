import app from "./app";
import { connect_database } from "./models/index";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;




app.listen(PORT, (): void => {
    connect_database();
    console.log(`The server is listening to port ${PORT}`);
})

