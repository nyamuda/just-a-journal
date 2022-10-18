import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();




router.route("/posts")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Get all the blog posts'
        // #swagger.description ='<p>The GET request only returns all the blogs written by the logged in author or user.</p>'
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
                        <li><p><b>title</b> &#187; A string : Required. The title of the post.</p></li>
                        <li><p><b>content</b> &#187; A string : Required. The content of the post.</p></li>
                        <li><p><b>tags</b> &#187; An array/list : Optional. All the tags related to the blog post.</p></li>
                        <li><p><b>summary</b> &#187; A string : Optional. A brief summary of the post.</p></li>
                        <li>
                         <p><b>status</b> &#187; A string : Optional. The status of the blog post.The status can either be <i>published</i> or <i>draft</i>. The default status is <i>published</i>.</p>
                        </li>
                        <li>
                          <p><b>category</b> &#187; A string : Optional. The category in which the post belongs. The default is <i>miscellaneous</i>. To see a list of all the available categories, make a GET request to <i>/categories</i>.</p>
                        </li>
                       </ul>',
                       schema: { $ref: '#/definitions/addPost' }
               } 
        
        
        */
        // getAuthors(req, res);
    })


router.route("/posts/:id")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog post by id'

        // getAuthors(req, res);
    })
    .put((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Update an existing blog post'
        // #swagger.description ='<p>You can only update blogs you've written. So, only a logged-in user can update their posts.</p>'
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
        // #swagger.description ='<p>You can only delete blogs you've written. So, only a logged-in user can delete their posts.</p>'
        // getAuthors(req, res);
    })

router.route("/posts/findByTags")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog posts by tags'
        // #swagger.description ='Tags to filter by'

        /* 
        #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/tags' }
             } 

        */

        // getAuthors(req, res);
    })
router.route("/posts/findByStatus")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog posts by status'
        // #swagger.description ='<p>At the moment, there are only two available statuses: <i>draft</i> and <i>publish</i>.</p>'

        /* 
        #swagger.parameters['status'] = {
                     schema: { $ref: '#/definitions/statuses' }
                    
             } 

        */

        // getAuthors(req, res);
    })




export { router as postRoutes }