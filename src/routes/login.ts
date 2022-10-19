import express, { Request, Response } from "express";
let router = express.Router();
import { loginAuthor } from "../controllers/index"




router.route("/authors/login")
    .post((req: Request, res: Response) => {
        /* 
         #swagger.tags = ['Authors']
        #swagger.summary = 'Login an author'


        #swagger.parameters['obj'] = {
                       in: 'body',
                       description: '<p>If the login process is successful, an access token is returned. 
                       You can use this token to access various endpoints of the API. 
                       The token expires in 24 hours.</p>',
                       schema: { $ref: '#/definitions/loginUser' }
               } 
        
       */
        loginAuthor(req, res)
    })



export { router as loginRoutes }