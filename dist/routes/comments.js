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
let router = express_1.default.Router();
exports.commentRoutes = router;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/comments/:commentId")
    .put((req, res) => {
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
    .delete((req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Delete a comment'
    // #swagger.description ='<p>You can only delete comments you've written. So, only a user with valid access token can delete their comments.</p>'
    // getAuthors(req, res);
});
router.route("/comments/:postId")
    .get((req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get all the comments for a particular post'
    // #swagger.description ='<p>Get all the comments for a post by passing in the id of the post.</p>'
    // getAuthors(req, res);
});
