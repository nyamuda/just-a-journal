import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { connect_database } from "./models/index";
import * as routes from "./routes/index";
import cors from "cors";
dotenv.config();


let app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Just a Journal");
})
app.use(routes.authorRoutes);
app.use(routes.oauthRoutes);
app.use(routes.loginRoutes);
app.use(routes.registerRoutes);
app.use(routes.swaggerRoutes);
app.use(routes.postRoutes);
app.use(routes.commentRoutes);
app.use(routes.categoryRoutes);
app.use(routes.tagRoutes);





app.listen(PORT, (): void => {
    connect_database();
    console.log(`App listening to port ${PORT}`);
})