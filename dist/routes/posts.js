"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.postRoutes = router;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/posts")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Get all the blog posts'
    // #swagger.description ='<p>The GET request only returns all the blogs written by the author or user.</p>'
    // getAuthors(req, res);
})
    .post((req, res) => {
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
});
router.route("/posts/:id")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Find blog post by id'
    // getAuthors(req, res);
})
    .put((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Update an existing blog post'
    // #swagger.description ='<p>You can only update blogs you've written. So, only a user with valid access token can update their posts.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updatePost' }
         }
  
  
  */
    // getAuthors(req, res);
})
    .delete((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Delete a blog post'
    // #swagger.description ='<p>You can only delete blogs you've written. So, only a user with valid access token can delete their posts.</p>'
    // getAuthors(req, res);
});
router.route("/posts/findByTags")
    .get((req, res) => {
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
});
router.route("/posts/findByStatus")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Find blog posts by status'
    // #swagger.description ='<p>At the moment, there are only two available statuses: <i>draft</i> and <i>publish</i>.</p>'
    /*
    #swagger.parameters['status'] = {
                 name:'status',
                 type:'query',
                 description: 'Status value that need to be considered for filter',
                 required:'true',
                 default:'publish',
                 explode:'true',
                 'enum':['publish','draft']
                 
                
         }

    */
    // getAuthors(req, res);
});
router.route("/posts/findByCategory")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Find blog posts by category'
    // #swagger.description ='<p>To see a list of all the available categories, make a GET request to <i>/categories</i>.</p>'
    /*
    #swagger.parameters['category'] = {
                 name:'category',
                 type:'query',
                 description: 'Category value that need to be considered for filter',
                 required:'true',
                 default:'miscellaneous',
                 explode:'true'
                 
                
         }

    */
    // getAuthors(req, res);
});
