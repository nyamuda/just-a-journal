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
const index_1 = require("../controllers/index");
let router = express_1.default.Router();
exports.tagRoutes = router;
const middleware = __importStar(require("../utils/middleware"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
router.route("/tags")
    .get(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get all the tags'
    // #swagger.security = [{"apiKeyAuth": []}]
    (0, index_1.getAllTags)(req, res);
});
router.route("/tags/:tagId")
    .get(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get a tag by id'
    // #swagger.security = [{"apiKeyAuth": []}]
    (0, index_1.getTagById)(req, res);
})
    .put(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Update an existing tag'
    // #swagger.security = [{"apiKeyAuth": []}]
    /*
   #swagger.parameters['obj'] = {
                 in: 'body',
                 schema: { $ref: '#/definitions/updateTag' }
         }
  
  
  */
    (0, index_1.updateTagById)(req, res);
})
    .delete(middleware.ensureLogin, (req, res) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Delete a tag'
    // #swagger.security = [{"apiKeyAuth": []}]
    (0, index_1.deleteTagById)(req, res);
});
