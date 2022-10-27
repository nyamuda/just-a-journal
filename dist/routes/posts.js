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
const middleware = __importStar(require("../utils/middleware"));
const controllers_1 = require("../controllers");
dotenv.config();
router.route("/posts")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.summary = 'Get all the posts'
    // #swagger.description ='<p>The GET request returns all the posts by various authors.</p>'
    (0, controllers_1.getAllPosts)(req, res);
});
router.route("/posts")
    .post(middleware.ensureLogin, (req, res) => {
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
    (0, controllers_1.addPost)(req, res);
});
router.route("/posts/findByTags")
    .get(middleware.ensureLogin, (req, res) => {
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
    (0, controllers_1.getPostByTags)(req, res);
});
router.route("/posts/findByStatus")
    .get(middleware.ensureLogin, (req, res) => {
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
    (0, controllers_1.getPostByStatus)(req, res);
});
router.route("/posts/findByCategory")
    .get(middleware.ensureLogin, (req, res) => {
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
    (0, controllers_1.getPostByCategory)(req, res);
});
router.route("/posts/:id")
    .get((req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Find blog post by id'
    (0, controllers_1.getPostById)(req, res);
})
    .put(middleware.ensureAuthorizedUpdateDeletePost, (req, res) => {
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
    (0, controllers_1.updatePostById)(req, res);
})
    .delete(middleware.ensureAuthorizedUpdateDeletePost, (req, res) => {
    // #swagger.tags = ['Posts']
    // #swagger.summary = 'Delete a blog post'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p>You can only delete posts you've written (unless you're the admin). To access this route, you must provide the access token.</p>'
    (0, controllers_1.deletPostById)(req, res);
});
