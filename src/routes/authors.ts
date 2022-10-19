import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();




router.route("/authors")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Get a list of all the authors'
        //#swagger.description ='<p><span style="color:red;"><b>Note:</b></span> Only admins have the authority to do this.</p>'

        // getAuthors(req, res);
    })


router.route("/authors/:authorId")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Get an author by id'
        // getAuthors(req, res);
    })
    .put((req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Update an existing author'
        // #swagger.description ='<p>Only an author with valid access token can update their details.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateUser' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete((req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Delete an existing author'
        // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to delete an author.</p>'

        // getAuthors(req, res);
    })


export { router as authorRoutes }