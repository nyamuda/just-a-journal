import express from "express";
import { registerAuthor } from "../controllers/index";
import { Request, Response } from "express";
let router = express.Router();



router.route("/authors/register")
    .post((req: Request, res: Response) => {
        /*
        #swagger.tags = ['Authors']
        #swagger.summary = 'Register a new author...'    
        #swagger.parameters['obj'] = {
                       in: 'body',
                       description: 'If the registration process is successful, an access token is returned.\n
                        You can use this token to access various endpoints of the API.\n 
                        The token expires in 24 hours.',
                       schema: { $ref: '#/definitions/registerUser' }
               } 

               */
        registerAuthor(req, res);
    })



export { router as registerRoutes };