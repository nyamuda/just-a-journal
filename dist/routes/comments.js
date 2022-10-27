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
exports.commentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
let router = express_1.default.Router();
exports.commentRoutes = router;
const middleware = __importStar(require("../utils/middleware"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/:postId/comments")
    .post(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Add a comment to a post'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p>To access this route, you must provide the access token.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/addComment' }
         }
  
  
  */
    (0, index_1.addComment)(req, res);
});
router.route("/comments/:commentId")
    .get(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.summary = 'Get a comment by id'
    (0, index_1.getCommentById)(req, res);
})
    .put(middleware.ensureAuthorizedUpdateDeleteComment, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Update an existing comment'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p>You can only update comments you've written. So, only a user with valid access token can update their comments.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updateComment' }
         }
  
  
  */
    (0, index_1.updateCommentById)(req, res);
})
    .delete(middleware.ensureAuthorizedUpdateDeleteComment, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Delete a comment'
    // #swagger.security = [{"apiKeyAuth": []}]
    // #swagger.description ='<p>You can only delete comments you've written. So, only a user with valid access token can delete their comments.</p>'
    // getAuthors(req, res);
    (0, index_1.deleteCommentById)(req, res);
});
