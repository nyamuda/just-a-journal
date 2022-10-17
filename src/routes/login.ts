import express, { Request, Response } from "express";
let router = express.Router();
import { loginAuthor } from "../controllers/index"




router.route("/login")
    .post((req: Request, res: Response) => {
        /*    #swagger.parameters['obj'] = {
                        in: 'body',
                        description: 'Login a user',
                        schema: { $ref: '#/definitions/loginUser' }
                } */
        loginAuthor(req, res)
    })



export { router as loginRoutes }