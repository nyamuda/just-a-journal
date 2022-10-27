import express, { Request, Response } from "express";
import { getAuthors } from "../controllers/index";
let router = express.Router();
import * as dotenv from "dotenv";
import * as middleware from '../utils/middleware';
import {
    addPost, getAllPosts, updatePostById, deletPostById, getPostById,
    getPostByTags, getPostByCategory, getPostByStatus
} from "../controllers"
dotenv.config();




router.route("/posts")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.summary = 'Get all the posts'

        // #swagger.description ='<p>The GET request returns all the posts by various authors.</p>'
        getAllPosts(req, res);
    })
router.route("/posts")
    .post(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Add a post'
        // #swagger.security = [{"apiKeyAuth": []}]
        /* 
         #swagger.parameters['obj'] = {
                       in: 'body',
                       description: '<p>To access this route, you must provide the access token. The logged in author/user id will be added to the post if the POST request is successful.</p>
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
        addPost(req, res)
    })

router.route("/posts/findByTags")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog posts by tags'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p>Tags to filter by. List all the tags separated by a comma, e.g. "medicine,economics,history".</p>'

        /* 
        #swagger.parameters['tags'] = {
                     name:'tags',
                     in:'query',
                     description: 'Tag value that need to be considered for filter',
                     required:'true',
                     default:'medicine',
                     explode:'true',
                     schema: {
                           type:'string'
                        }
                    
                    
             } 

        */

        getPostByTags(req, res);
    })
router.route("/posts/findByStatus")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog posts by status'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p>At the moment, there are only two available statuses: <i>draft</i> and <i>publish</i>.</p>'

        /* 
        #swagger.parameters['status'] = {
                     name:'status',
                     in:'query',
                     description: 'Status value that need to be considered for filter',
                     required:'true',
                     default:'publish',
                     explode:'true',
                     'enum':['publish','draft'],
                     schema: {
                           type:'string'
                        }
                     
                    
             } 

        */

        getPostByStatus(req, res)
    })

router.route("/posts/findByCategory")
    .get(middleware.ensureLogin, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog posts by category'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p>To see a list of all the available categories, make a GET request to <i>/categories</i>.</p>'

        /* 
        #swagger.parameters['category'] = {
                     name:'category',
                     in:'query',
                     description: 'Category value that need to be considered for filter',
                     required:'true',
                     default:'miscellaneous',
                     explode:'true',
                     schema: {
                           type:'string'
                        }
                     
                    
             } 

        */

        getPostByCategory(req, res);
    })



router.route("/posts/:id")
    .get((req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Find blog post by id'

        getPostById(req, res);
    })
    .put(middleware.ensureAuthorizedUpdateDeletePost, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Update an existing post'
        // #swagger.security = [{"apiKeyAuth": []}]

        /* 
       #swagger.description ='<p>You can only update posts you've written (unless you're the admin). To access this route, you must provide the access token.</p>'
       #swagger.parameters['obj'] = {
                     in: 'body',
                     schema: { $ref: '#/definitions/updatePost' }
             } 
      
      
      */
        updatePostById(req, res);
    })
    .delete(middleware.ensureAuthorizedUpdateDeletePost, (req: Request, res: Response) => {
        // #swagger.tags = ['Posts']
        // #swagger.summary = 'Delete a blog post'
        // #swagger.security = [{"apiKeyAuth": []}]
        // #swagger.description ='<p>You can only delete posts you've written (unless you're the admin). To access this route, you must provide the access token.</p>'
        deletPostById(req, res);
    })






export { router as postRoutes }