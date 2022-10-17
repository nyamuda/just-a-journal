import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();




router.route("/authors")
    .get((req: Request, res: Response) => {
        // #swagger.summary = 'Get all the authors...'
        getAuthors(req, res);
    })


export { router as authorRoutes }