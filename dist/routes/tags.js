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
exports.tagRoutes = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.tagRoutes = router;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/tags")
    .get((req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get all the tags'
    // getAuthors(req, res);
});
router.route("/tags/:tagId")
    .get((req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get a tag by id'
    // getAuthors(req, res);
})
    .put((req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Update an existing tag'
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updateTag' }
         }
  
  
  */
    // getAuthors(req, res);
})
    .delete((req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Delete a tag'
    // getAuthors(req, res);
});
