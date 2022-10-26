import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as middleware from '../utils/middleware';
import * as dotenv from "dotenv";
dotenv.config();



router.route("/tags")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Tags']
        // #swagger.summary = 'Get all the tags'
        // #swagger.security = [{"apiKeyAuth": []}]
        // getAuthors(req, res);
    })




router.route("/tags/:tagId")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Tags']
        // #swagger.summary = 'Get a tag by id'
        // #swagger.security = [{"apiKeyAuth": []}]
        // getAuthors(req, res);
    })

    .put(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Tags']
        // #swagger.summary = 'Update an existing tag'
        // #swagger.security = [{"apiKeyAuth": []}]
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateTag' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Tags']
        // #swagger.summary = 'Delete a tag'
        // #swagger.security = [{"apiKeyAuth": []}]
        // getAuthors(req, res);
    })












export { router as tagRoutes }