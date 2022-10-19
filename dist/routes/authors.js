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
exports.authorRoutes = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.authorRoutes = router;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/authors")
    .get((req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.summary = 'Get a list of all the authors'
    //#swagger.description ='<p><span style="color:red;"><b>Note:</b></span> Only admins have the authority to do this.</p>'
    // getAuthors(req, res);
});
router.route("/authors/:authorId")
    .get((req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.summary = 'Get an author by id'
    // getAuthors(req, res);
})
    .put((req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.summary = 'Update an existing author'
    // #swagger.description ='<p>Only an author with valid access token can update their details.</p>'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updateUser' }
         }
  
  
  */
    // getAuthors(req, res);
})
    .delete((req, res) => {
    // #swagger.tags = ['Authors']
    // #swagger.summary = 'Delete an existing author'
    // #swagger.description ='<p><span style="color:red"><b>Note:</b></span> Only admins have the authority to delete an author.</p>'
    // getAuthors(req, res);
});
