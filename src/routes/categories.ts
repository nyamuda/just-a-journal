import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();



router.route("/categories")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Get all the categories'
        // getAuthors(req, res);
    })




router.route("/categories/:categoryId")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Get a category by id'
        // getAuthors(req, res);
    })

    .put((req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Update an existing category'
        // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to update existing categories.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateCategory' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete((req: Request, res: Response) => {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Delete a category'
        // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to delete a category.</p>'
        // getAuthors(req, res);
    })












export { router as categoryRoutes }