import express from "express";
let router = express.Router();
import * as dotenv from "dotenv";
import { loginGithub } from "../controllers/index"
dotenv.config();




router.route("/oauth/github")
    .get((req, res): void => {
        let url: string = `https://github.com/login/oauth/authorize?client_id=${process.env.ClientID}`;
        res.redirect(url);
    })

router.route("/oauth/github-callback")
    .get(loginGithub)




export { router as oauthRoutes }