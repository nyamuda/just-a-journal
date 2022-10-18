import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();




router.route("/posts")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Get all the blog posts'
        //swagger.description ='The GET request only returns all the blogs written by the logged in author or user.'
        // getAuthors(req, res);
    })
    .post((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Add a blog post'
        /* 
         #swagger.parameters['obj'] = {
                       in: 'body',
                       description: 'The logged in author/user id will be added to the post if the POST request is successful.\n
                       <h3>Fields</h3>\n
                       <ul>
                       <li><b>title</b> A string : Required. The title of the post</li>
                        <li><b>content</b> A string : Required. The content of the post</li>
                         <li><b>tags</b>An array/list : Optional. All the tags related to the blog post</li>
                          <li><b>summary</b>A string : Optional. A brief summary of the post</li>
                           <li><b>status</b>A string : Optional. The status of the blog post.The status can either be "published" or "draft".\n 
                           If the status of the post is "draft," then the post won't be available for viewing (the post won't show up in any post GET requests).\n 
                           The default status is "published".</li>
                           <li><b>category</b>A string : Optional. The category in which the post belongs. The default is 'miscellaneous'\n
                           To see a list of all the available categories, make a GET request to /categories.
                           </li>
                       </ul>',
                       schema: { $ref: '#/definitions/addPost' }
               } 
        
        
        */
        // getAuthors(req, res);
    })


router.route("/posts/:id")
    .put((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Update an existing blog post'
        //swagger.description ='You can only update blogs you've written. So, only a logged-in user can update their posts.'
        /* 
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updatePost' }
             } 
      
      
      */
        // getAuthors(req, res);
    })
    .delete((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Delete a blog post'
        //swagger.description ='You can only delete blogs you've written. So, only a logged-in user can delete their posts.'
        // getAuthors(req, res);
    })




export { router as postRoutes }