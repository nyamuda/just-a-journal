import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();






router.route("/comments/:commentId")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Get a comment by id'

        // getAuthors(req, res);
    })
    .put((req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Update an existing comment'
        // #swagger.description ='<p>You can only update comments you've written. So, only a user with valid access token can update their comments.</p>'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updateComment' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete((req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Delete a comment'
        // #swagger.description ='<p>You can only delete comments you've written. So, only a user with valid access token can delete their comments.</p>'
        // getAuthors(req, res);
    })

router.route("/comments/:postId")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Comments']
        // #swagger.summary = 'Get all the comments for a particular post'
        // #swagger.description ='<p>Get all the comments for a post by passing in the id of the post.</p>'
        // getAuthors(req, res);
    })










export { router as commentRoutes }