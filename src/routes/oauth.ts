import express, { Request, Response } from "express";
let router = express.Router();
import * as dotenv from "dotenv";
import { loginGithub } from "../controllers/index"

dotenv.config();




router.route("/oauth/github")
    .get((req: Request, res: Response): void => {
        let url: string = `https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}`;
        return res.redirect(url);
    })

router.route("/oauth/github-callback")
    .get(loginGithub)




export { router as oauthRoutes }