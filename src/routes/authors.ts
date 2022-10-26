import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as middleware from '../utils/middleware';

import * as dotenv from "dotenv";
dotenv.config();




router.route("/authors")
    .get(middleware.ensureAdmin, (req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Get a list of all the authors'
        //#swagger.description ='<p><span style="color:red;"><b>Note:</b></span> Only admins have the authority to do this.</p>'

        // getAuthors(req, res);
    })


router.route("/authors/:authorId")
    .get(middleware.ensureRightUser, (req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Get an author by id'
        //#swagger.description='<p>Only admins or the correct user/author have the authority to do this.</p>'
        // getAuthors(req, res);
    })
    .put(middleware.ensureRightUser, (req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Update an existing author'
        // #swagger.description ='<p>Only admins or the correct user/author have the authority to do this.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateUser' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete(middleware.ensureRightUser, (req: Request, res: Response) => {
        // #swagger.tags = ['Authors']
        // #swagger.summary = 'Delete an existing author'
        // #swagger.description ='<p>Only admins or the correct user/author have the authority to do this.</p>'

        // getAuthors(req, res);
    })


export { router as authorRoutes }