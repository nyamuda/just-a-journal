import express, { Request, Response } from "express";
let router = express.Router();
import { loginAuthor } from "../controllers/index"




router.route("/authors/login")
    .post((req: Request, res: Response) => {
        /* 
         #swagger.tags = ['Authors']
        #swagger.summary = 'Login an author...'
        
        #swagger.parameters['email'] = {
        in: 'query',
        name:'email',
        description: 'The email for login',
        required:true,
        type: 'string',
        schema: {
            type:'string'
        }
    }
        
        
        #swagger.parameters['password'] = {
        in: 'query',
        name:'password',
        description: 'The password for login',
        required:true,
        type: 'string',
        schema: {
            type:'string'
        }
        } */
        loginAuthor(req, res)
    })



export { router as loginRoutes }