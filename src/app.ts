import express, { Request, Response } from "express";

import * as routes from "./routes/index";
import cors from "cors";


let app = express();



app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to Just a Journal" });
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

export default app;
