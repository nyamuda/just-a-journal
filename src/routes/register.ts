import express from "express";
import { registerAuthor } from "../controllers/index";
import { Request, Response } from "express";
let router = express.Router();



router.route("/register")
    .post((req: Request, res: Response) => {
        /*    #swagger.parameters['obj'] = {
                       in: 'body',
                       description: 'Register a new user',
                       schema: { $ref: '#/definitions/registerUser' }
               } */
        registerAuthor(req, res);
    })



export { router as registerRoutes };